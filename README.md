# [바닐라 JS로 크롬 앱 만들기 (NomadCoders)](https://nomadcoders.co/javascript-for-beginners)



|배우는 이론|구현하는 기능|___packagee___|
|---|--------------|:----------:|
|[Variables](#variables)|JS Clock|*Javascript*|
|Functions|JS To Do List|*localStorage*|
|[Data Types](#data-types)|Get Geolocation|*AJAX*|
|Arrays, Objects|Get Weather Information|*JSON*|
|DOM Functions|Deploy to Github Pages|*DOM*|
|Events||*fetch*|
|if / else / for||*OpenWeather API*|


## Variables
```
var 변수 - 재선언 O / 재할당 O
let 변수 - 재선언 X / 재할당 O
const 상수 - 재선언 X / 재할당 X (ex. const a; -> 재할당이 안되기 때문에 선언과 동시에 할당을 해주어야 한다)

- 재선언
var a = "홍길동";
var a = "김도영";

- 재할당
var a = "홍길동";
a = "김도영";
```

# [*-----i added(Variables)*]

- **호이스팅 Hoisting**

호이스팅은 코드를 실행하기 전 변수선언/함수선언을 해당 스코프의 최상단으로 끌어올리는 것은 아니지만 끌어올려진 것 같은 현상

자바스크립트 엔진은 코드를 실행하기 전 실행 가능한 코드를 형상화하고 구분하는 과정(*실행 컨텍스트를 위한 과정)을 거친다.

-> 실행 컨텍스트를 위한과정에서 모든 선언(var, let, const, function, class)을 스코프에 등록하기 때문에 코드 실행 전 이미 변수선언/함수선언이 저장되있다. 그래서 변수 var 선언문과 함수 선언문은 선언문보다 참조/호출이 먼저 나와도 오류 없이 동작한다. 이런 것이 선언이 맨 위로 끌어올려진 것 처럼 보인다

* 실행 컨텍스트 : 실행 가능한 코드가 실행되기 위해 필요한 환경 -> 실행되기전 이러한 실행 컨텍스트 과정(코드를 구분하는 과정)이 있다.

=> 호이스팅 : 선언이 코드 실행 보다 먼저 메모리에 저장되는 과정으로 인한 현상






자바스크립트의 모든 선언은 호이스팅이 발생한다 -> 그러나 `let, const, class`의 경우, 선언하기 전에 참조하면 호이스팅이 발생하지 않는 것처럼 참조 에러(ReferenceError)가 발생한다(var는 undefined가 나온다)

```
console.log(d)
let d = 1;
에러 메세지 : ReferenceError: d is not defined

console.log(c)
var c = 1;
결과 : undefined
```

이유는 let 이나 const로 선언된 변수는 스코프의 시작에서 변수의 선언까지 일시적 사각지대(Temporal Dead Zone; TDZ)이기 때문이다
```
일시적 사각지대(Temporal Dead Zone; TDZ) : 스코프의 시작 지점부터 초기화 시작 지점까지의 구간

```

변수를 선언하기 전에 변수를 참조해서 에러를 발생시킨다고 호이스팅(선언이 먼저 메모리에 저장, 파일의 맨위로 끌어올려진다는 의미)이 발생하지 않은 것은 아니다 -> 선언은 호이스팅 되었는데 에러가 발생하는 이유는 아래와 같은 차이점 때문이다

- ***var*** : 선언과 함께 메모리에 저장될 때 undefined로 초기화되서 저장
- ***let, const*** : 메모리에 저장될 때 초기화되지 않은 상태로 선언만 저장됨

초기화가 않된 변수는 참조가 안되기 때문에 참조 에러를 발생시킨다. let, const도 호이스팅이 발생한다는 증거는 아래코드로 증명된다.
선언이 호이스팅 되었기 때문에 블록 스코프에서 참조에러가 아닌 엑세스 할 수 없다는 에러가 발생한 것이다

```
let a = 123;
{
  console.log(a);
  let a = 456;
}

에러메세지 : Cannot access 'a' before initialization
초기화 전에 'a'에 액세스할 수 없다는 에레메세지가 나온다. (var로 변수선언하면 에러 없이 123이 출력된다)
```

변수선언 var 와 함수선언식은 선언 전에 호출해도 에러가 발생하지 않기 때문에 var 와 함수선언식만 호이스팅(위로 끌어올림)이 발생하는 것처럼 보이지만 let, const 같은 선언식들도 호이스팅이 발생했기 때문에 에러가 생기는 것을 알 수 있다.
-> 에러 때문에 호이스팅이 되지않는 것이 아니고 호이스팅으로 인한 에러라고 보는 것이 정확하다


- 변수의 생성과정 및 호이스팅(총 3단계)

1. 선언 단계(Declaration phase)
    - 변수를 실행 컨텍스트의 변수 객체에 등록한다.
    - 이 변수 객체는 스코프가 참조하는 대상이 된다.

2. 초기화 (Initialization phase)
    - 변수 객체에 등록된 변수를 위한 공간을 메모리에 확보한다.
    - 이 단계에서 변수는 undefined로 초기화 된다.

3. 할당 (Assignment phase)
    - undefined로 초기화된 변수에 실제 값을 할당한다.


var 키워드로 선언한 변수는 선언 단계와 초기화 단계가 한번에 이뤄진다. 즉, 스코프에 변수를 등록(선언 단계)하고 메모리에 변수를 위한 공간을 확보한 후, undefined로 초기화한다. 따라서 변수 선언문 이전에 변수에 접근하여도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만 undefined를 반환한다. 이후 변수 할당문에 도달하면 비로소 값이 할당된다.

let 키워드로 선언된 변수는 선언 단계와 초기화 단계가 분리되어 진행된다. 즉, 스코프에 변수를 등록(선언 단계)하지만 초기화 단계는 변수 선언문에 도달했을 때(코드 실행 후) 이뤄진다. 초기화 이전에 변수에 접근하려고 하면 참조 에러가 발생한다. 이는 아직 변수가 초기화되지 않았기 때문이다. 즉, 변수를 위한 메모리 공간이 아직 확보되지 않았기 때문이다. 따라서 스코프의 시작 지점부터 초기화 시작 지점까지는 변수를 참조할 수 없다. 스코프의 시작 지점부터 초기화 시작 지점까지의 구간을 **일시적 사각지대 Temporal Dead Zone, TDZ**라고 부른다.




***선언은 끌어 올라가지만 할당이 끌어 올라가지 않는다.***

[참고](https://hanamon.kr/javascript-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85%EC%9D%B4%EB%9E%80-hoisting/)

- **스코프 Scope**

식별자 접근 규칙에 따른 유효 범위 -> 스코프(범위)는 중괄호({}, 블록, Block Scope) 또는 함수(Function Scope)에 의해 나눠진다.(화살표 함수는 Function Scope가 아니라 Block Scope로 취급한다)

- 규칙

1. 안쪽 스코프에서 바깥쪽 스코프로 접근할 수 있지만 반대는 불가능하다.

바깥쪽 스코프에서 선언한 식별자는 안쪽 스코프에서 사용 가능하다.
반면, 안쪽에서 선언한 식별자는 바깥쪽 스코프에서는 사용할 수 없다.

2. 스코프는 중첩이 가능하다.

3. 전역 스코프와 지역 스코프

가장 바깥쪽의 스코프를 전역 스코프(Global Scope)라고 부른다. 그외 다른 스코프는 전부 지역 스코프(Local Scope)이다.

4. 지역 변수는 전역 변수보다 우선순위가 더 높다.

전역 스코프에서 선언한 변수는 전역 변수이다.
지역 스코프에서 선언한 변수는 지역 변수이다.
지역 변수는 전역 변수보다 더 높은 우선순위를 가진다.


let, const -> Block Scope, Function Scope

var -> Function Scope 만 가능하다.





[참고](https://hanamon.kr/javascript-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%EB%B3%80%EC%88%98%EC%84%A0%EC%96%B8%ED%82%A4%EC%9B%8C%EB%93%9C-%EC%B0%A8%EC%9D%B4%EC%A0%90/)

## Data Types
```
string - text
number - 1. integer(정수) 2. float(소수)
```
