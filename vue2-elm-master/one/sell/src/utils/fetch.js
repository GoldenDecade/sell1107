export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type  = type.toLocaleUpperCase()

  if(type === 'GET'){
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if(dataStr !== ''){
      dataStr = dataStr.slice(0, dataStr.length - 1)
    }
    url = url + '?' + dataStr
  }

  if(window.fetch && method == 'fetch'){
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    }
    if(type === 'POST'){
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig) // fetch 返回promise对象
      const responseJson = await response.json() // 生成JSON.parse(responseText)的结果
      // console.log(responseJson);
      return responseJson
    } catch(error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj
      if(window.XMLHttpRequest){
        requestObj = new XMLHttpRequest()
      }else {
        requestObj = new ActiveXObject()
      }

      let sendData = ''
      if(type === 'POST'){
        sendData = JSON.stringify(data)
      }
      requestObj.open(type, url, true)
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if(requestObj.readyState === 4 && (requestObj.status >= 200 && requestObj.status < 300 || requestObj.status == 304)){
          let obj = requestObj.response
          if(typeof obj !== 'object'){
            obj = JSON.parse(obj)
          }
          resolve(obj)
        }else {
          reject(requestObj)
        }
      }
    })
  }

}
