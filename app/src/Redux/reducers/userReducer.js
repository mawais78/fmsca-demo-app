import { FETCH_FATA_REQUEST_SENT, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, CURRENT_LOCATION_REQUEST_SENT, CURRENT_LOCATION_SUCCESS, CURRENT_LOCATION_FAIL } from '../type'

const initialState = {
  message: null,
  data: [],
  loading: false,
  previousVideos: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FATA_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case CURRENT_LOCATION_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case CURRENT_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case CURRENT_LOCATION_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    default:
      return state
  }
}

export default userReducer