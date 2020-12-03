import React from "react";
import { moviesApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  // 만들어야하는 기능(함수):
  // 1. submit: 서버에 보낸다. 2. update 3. search: process 를 진행한다.
  // 1. submit:
  handleSubmit = (event) => {
    // preventDefault: SearchPresenter의 <Form>으로부터 submit된 작업(event)을 취소
    // event에서 하고자하는일이 많을 때 customizing을 위해 사용. 
    // ex. 비밀번호/id 중복검사 
    event.preventDefault();

    const { searchTerm } = this.state;

    if (searchTerm !== "") {
      this.searchByTerm;
    }
  };

  // update: onChange에서 일어날 이벤트
  updateTerm = (event) => {
    const {
      target: { value: searchTerm },
    } = event;
    this.setState({ searchTerm });
  };

  // search: 검색어를 넣은 API 호출
  // event가 일어났을 때 비동기로 호출 --async함수!
  searchByTerm = async () => {
    // 1. 검색어 가져오기
    const { searchTerm } = this.state;

    // 2. loading 설정하기
    this.setState({ loading: true });

    // 3. 실제 api 호출하기
    // 실제 data의 응답형태:
    // { data: {results: [{}, {}, {}, ...]}}
    try {
      // movies(tv)Api.search -> movie(tv)Results에 담기
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);

      this.setState({ movieResults, tvResults });
    } catch (error) {
      this.setState({ error: "결과를 찾을 수 없습니다." });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
