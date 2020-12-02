import React from "react";
import { moviesApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  // 생성자에서 할 일
  // state 관리
  // pathname 받기
  constructor(props) {
    super(props);

    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    // 1. id 가지고 오기 <-- match.params
    //    id가 없다면 Movie로 강제이동 <-- history.push
    //   cf. 리다이렉트: 사용자의 요청을 서버가 받고 재요청하도록 하는 것.
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;

    const { isMovie } = this.state;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }

    let result = null;

    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch (error) {
      this.setState({
        error: "nothing to find",
      });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
