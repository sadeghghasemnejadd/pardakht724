export const actionTypes = {
  UPDATE_SORT_DATA: "UPDATE_SORT_DATA",
};

export const updateSortData = (sortData) => ({
  type: actionTypes.UPDATE_SORT_DATA,
  payload: sortData,
});
