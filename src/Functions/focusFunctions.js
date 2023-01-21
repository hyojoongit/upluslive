//***focused가 soon에 속할때, focused된 카드의 배열 내 순서 반환***//
export function searchCards(focused) {
  let parsed = parseInt(focused);
  if (parsed / 100 >= 1 && parsed / 100 < 2) {
    return parsed % 100;
  } else return 0;
}

//***인자를 id 형태(세 자리 문자열)로 변환***//
export function parseToId(num) {
  if (num >= 0 && num <= 9) {
    return "00" + num;
  } else if (num >= 10 && num <= 99) {
    return "0" + num;
  } else if (num >= 100 && num <= 999) {
    return num;
  } else {
    console.log("Cannot parse to Id : id over 999");
    return;
  }
}

//***focused 가 본인인지 확인하는 함수. boolean 반환.***//
export function isFocused(line, focused, i) {
  let parsed = "";
  if (line == "000") {
    parsed = parseToId(i);
  } else if (line == "100") {
    parsed = parseToId(100 + i);
  } else if (line == "200") {
    parsed = parseToId(200 + i);
  }
  return parsed == focused ? true : false;
}
