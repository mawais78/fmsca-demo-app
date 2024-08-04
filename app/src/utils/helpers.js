import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import { store } from "../Redux/store";
import axios from "axios";
import RNFetchBlob from 'rn-fetch-blob'
import { Platform } from 'react-native';

export const validateEmail = (email) => {
  let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailError = "";
  if (!email.length) {
    emailError = "Email Required";
  } else if (!emreg.test(email)) {
    emailError = "Please Enter Valid Email";
  } else {
    emailError = [];
  }

  if (emailError.length) {
    return { status: false, message: emailError, };
  }
  return { status: true, message: "" };
};

export const getToken = async () => {
  try {
    return store.getState().auth.token;
  } catch (error) {

  }
}

export const filterAnswerValues = (answers) => {
  const requestValues = {}
  answers && answers.map(({ fieldType, fieldValue }) => {
    fieldValue = fieldValue.slice(0, 1).toUpperCase() + fieldValue.slice(1);

    switch (fieldType) {
      // For Auto Insurance
      case 'Brand':
        return requestValues.brand = fieldValue;
      case 'Model':
        return requestValues.model = fieldValue;
      case 'Model Year':
        return requestValues.modelYear = fieldValue;
      case 'Address':
        return requestValues.address = fieldValue;

      // For Home insurance
      case 'House Type':
        return requestValues.houseType = fieldValue;
      case 'Rooms':
        return requestValues.rooms = fieldValue;
      case 'Bathrooms':
        return requestValues.bathrooms = fieldValue;
      case 'Floors':
        return requestValues.floors = fieldValue;

      default:
        return requestValues[fieldType] = fieldValue;
    }
  })

  return requestValues
}

export const getMonthYear = (type) => {
  let currentPriceType = 'mth'
  if (parseInt(type) === 2) currentPriceType = 'yr'
  return currentPriceType
}

export const getDeviceToken = async () => {
  try {
    const resp = await messaging().getToken();
    return resp
  } catch(err) {
    console.log(err)
  }
  
}

export const countdown = async (from, duration, setRemainintTime, setClearIntrval, clearIntrval) => {
  let ntervalId = null;
  ntervalId = setInterval(() => {
    const diff = moment.duration(moment().diff(moment(from)));
    const seconds = diff.asSeconds();
    const remainingTime = duration - seconds;

    setRemainintTime(remainingTime < 0 ? 0 : remainingTime);
    if (remainingTime <= 0) clearInterval(ntervalId);
  }, 1000)

  if (clearIntrval) {
    clearInterval(ntervalId);
    setClearIntrval(false);
  };
}

export const fmtMSS = (s) => {
  return (s -
    (s %= 60)

  ) / 60 + (

      9 < s
        ? ':'
        : ':0'
    ) + s;
}

export const getPresignedUrl = async (img, type) => {
  const date = new Date();
  if (img) {
    let payload = {
      filename: type === 'document' ? img.name.replace(' ', '') : date.toString().replace(/ /g, '') + img.fileName
    }
    const option = {
      method: 'post',
      url: `https://qover-qa.azure-api.net/users/utils/sas`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(payload)
    };

    try {
      const { data } = await axios(option);
      if (data.url) {
        await RNFetchBlob.fetch(
          "PUT", data.url, {
          "x-ms-blob-type": "BlockBlob",
          "content-type": "application/octet-stream",
          "x-ms-blob-content-type": img.type
        },
          RNFetchBlob.wrap(Platform.OS ===  'android' ? img.uri : img.uri.replace('file://', ''))
        )
          .progress((progress) => {
            console.log("Progress ==> ", progress);
          })
          .uploadProgress((progress) => {
            console.log("Upload Progress ==> ", progress);
          })
          .then((response) => {
            console.log("Success Response ==> ", JSON.stringify(response));
          })
          .catch((e) => {
            console.log("Error at saving image into Azure Storage", JSON.stringify(e));
          })
      }
      return data.url.split('?')[0];
    } catch (error) {
      console.log(error);
    }
  }
}