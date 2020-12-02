import React from "react";
import MoviePresenter from "./MoviePresenter";
import { moviesApi } from "../../api";

export default class extends React.Component {
  // 다섯개의 state가 필요하다 (세 종류의 데이터+로딩+에러)
  // class component에서 state 만들기: 변수로 지정. 현재 state는 객체로 묶여져 있음.
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  // constructor: 생성자. 생성자의 매개변수로 부모component의 props가 들어옴.
  constructor(props) {
    super(props);
  }

  // component가 부모compounent에 마운트 됐을 때 호출되는 함수.
  // useEffect(()=>{}, [])와 같다.
  // useEffect에서의 비동기처리는 async-await함수를 따로 호출했어야 하지만
  // class component에서는 그저 앞에 async만 붙여주면 된다.
  async componentDidMount() {
    try {
      // console.log로 data가 어떤 구조로 되어있는지 파악
      // data > results에 원하는 내용이 있는 것을 확인
      // ( {data: {results: [{}, {}, {}, ...]}} )
      // unpacking: const {data:  {results}} = await moviesApi.nowPlaying();식으로 하면
      // nowplaying, upcoming, popular이 다같은 results라는 변수를 가지게 된다.

      // 해결 unpacking: results안에 있는 배열을 뽑아서 nowplaying에 집어넣는다.
      // 같은표현: const nowPlaying = (await moviesApi.nowPlaying()).data.results
      // cf. import { moviesApi } from "../../api"; 해주기
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();

      // data 잘 불러오는지 확인하기
      console.log(popular);

      // data를 state에 집어넣기
      this.setState({ nowPlaying, upcoming, popular });
    } catch (error) {
      this.setState({
        error: "영화정보를 찾을 수 없습니다.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    // state는 현재 객체로 묶여져있으므로 unpacking:
    // rendering할 때 불러오기:
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <MoviePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
