import axios from 'axios';
import { message } from 'antd';
//
// export const postRequest = (url, params = {}, callback) => {
// axios
//   .post(url, params)
//   .then(data => {
//     if (data.status === 200) {
//       if (data.data.success === true) {
//         callback();
//       } else {
//         message.error('操作失败');
//       }
//     }
//   })
//   .catch(error => {
//     console.log(error);
//     message.error('操作失败');
//   });
// };
//
// export const getRequest = (url, params = {}, callback) => {
// axios
//   .get(url, {
//     params: params,
//   })
//   .then(data => {
//     if (data.status === 200) {
//       callback(data.data.data);
//     }
//   })
//   .catch(error => {
//     console.log(error);
//     message.error('操作失败');
//   });
// };

export const get = (url, params = {}) => {
  return new Promise(function(resolve, reject) {
    axios
      .get(url, {
        params: params,
      })
      .then(data => {
        if (data.status === 200) {
          if (data.data.success === true) {
            resolve(data.data.data);
          } else {
            reject(data.data.data);
          }
        } else {
          reject(data.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const post = (url, params = {}) => {
  return new Promise(function(resolve, reject) {
    axios
      .post(url, params)
      .then(data => {
        if (data.status === 200) {
          if (data.data.success === true) {
            resolve(data.data.data);
          } else {
            reject(data.data.data);
          }
        } else {
          reject(data.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

//
// export const get = (url, params) => {
//   return new Promise(function(resolve, reject) {
//     var request = new XMLHttpRequest();
//
//     request.open('GET', url);
//     request.responseType = 'json';
//     request.onload = function() {
//       if (request.status === 200) {
//         console.log(request.response);
//         if (request.response.success === true) {
//           resolve(request.response.data);
//         } else {
//           reject(request.response.data); //todo
//         }
//       } else {
//         reject('error code:' + request.statusText);
//       }
//     };
//     request.onerror = function() {
//       reject('There was a network error.');
//     };
//     request.send();
//   });
// };
//
// export const post = (url, params) => {
//   return new Promise(function(resolve, reject) {
//     var request = new XMLHttpRequest();
//     request.open('POST', url);
//     request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     request.responseType = 'json';
//     request.onload = function() {
//       if (request.status === 200) {
//         console.log(request.response);
//         if (request.response.success === true) {
//           resolve(request.response.data);
//         } else {
//           reject(request.response.data); //todo
//         }
//       } else {
//         reject('error code:' + request.statusText);
//       }
//     };
//     request.onerror = function() {
//       reject('There was a network error.');
//     };
//     request.send(params);
//   });
// };
