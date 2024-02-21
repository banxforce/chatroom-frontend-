// 获取数组
export function getArray(key){
    const data = localStorage.getItem(key)
    return data? JSON.parse(data): []
}

// 添加数组元素
export function pushArray(key, value){
  let arr = getArray(key)
  arr.push(value)
  localStorage.setItem(key, JSON.stringify(arr))
}

// 得到userInfo
export function getUserInfo(){
  return JSON.parse(localStorage.getItem('userInfo'))
}