import React, { useEffect, useReducer } from "react";

type State = {
  reposSaved: GetOrgsRepo[];
  loaded: boolean;
};

type Action =
  | {
      type: "ADD_DATA";
      payload: {
        data: GetOrgsRepo;
      };
    }
  | {
      type: "LOADED";
    }
  | {
      type: "REMOVE_DATA";
      payload: {
        id: number;
      };
    }
  | {
      type: "LOAD_DATA";
      payload: {
        data?: GetOrgsRepo[];
      };
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOADED":
      return {
        ...state,
        loaded: true,
      };
    case "REMOVE_DATA":
      const reposSaved = state.reposSaved.filter(
        (repo) => action.payload.id !== repo.id
      );
      return {
        ...state,
        reposSaved,
      };
    case "ADD_DATA":
      return {
        ...state,
        reposSaved: [...state.reposSaved, ...[action.payload.data]],
      };
    case "LOAD_DATA":
      return {
        loaded: true,
        reposSaved: action.payload.data || [],
      };
  }
};

const initState = {
  reposSaved: [],
  loaded: false,
};

export const usePersistData = () => {
  const [{ reposSaved, loaded }, dispatch] = useReducer(reducer, initState);

  const handleRepoSelect = (data: GetOrgsRepo) => {
    dispatch({ type: "ADD_DATA", payload: { data } });
  };

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("data", JSON.stringify(reposSaved));
    }
  }, [reposSaved, loaded]);

  useEffect(() => {
    const data = localStorage.getItem("data");
    dispatch({
      type: "LOAD_DATA",
      payload: { data: data ? JSON.parse(data) : undefined },
    });
  }, []);

  const handleRepoRemove = (id: number) => {
    dispatch({ type: "REMOVE_DATA", payload: { id } });
  };

  return {
    handleRepoSelect,
    reposSaved,
    handleRepoRemove,
  };
};
