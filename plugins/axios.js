export default function ({ $axios, store, redirect }) {
  // $axios.onRequest(config => {
  //   const token = store.state.auth.token
  //   console.log('REQUEST token ' + token)
  //   //Append users access token top header if available
  //   if (token) {
  //     console.log('Appending token:')
  //     config.headers.common['Authorization'] = `Bearer ${token}`
  //   }

  //   // $axios.setToken('TEST', 'Bearer')
  //   // config.headers.common['Authorization'] = `Bearer SS`

  //   console.log('Request:')
  //   console.log(config)
  //   return config
  // })
  
  // $axios.onResponse(res =>{
  //   // console.log("onResponse - - - ", res);
  //   res.data.status = res.status;        
  //   //return res;
  // })
  
  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   console.log(code, 'Axios onError called')
  //   console.log(error)
  
  //   if (code === 400) {
  //     redirect('/400')
  //     throw error.response;
  //   }

  //   // if (code === 401) {
  //   //   redirect('/tool/landing')
  //   //   throw error.response;
  //   // }
  // })
}