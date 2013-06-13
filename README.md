# tween
JavaScriptのシンプルなトゥイーンエンジン

## デモ
http://knockknock-jp.github.io/tween/

## 使い方
オブジェクトのプロパティの値を現在の値から、指定した値まで、指定秒で、指定イージング関数を通して変化を与えつづけます。
まずライブラリを読み込みます。

    <script type="text/javascript" src="Tween.js"></script>

そして、第一引数にオブジェクトを渡してTween関数を実行して、戻り値を変数に格納してください。クラスベースのオブジェクト指向言語的に考えますと、Tweenクラスをnewしてインスタンスを生成するイメージです。

    var tween = knockknock.jp.Tween({a:0, b:0});

トゥイーンを実行したいタイミングで、このインスタンスの`play`メソッドを第一引数に*変化を与えたいプロパティと変化量*を、第二引数に*イージング関数と時間、各種コールバック*をそれぞれオブジェクトにして渡して、実行してください。

    tween.play({
        a: 100
        b: -100
    },{
        easing: knockknock.jp.Easing.sineEaseOut,
        duration: 1000,
        play: function(e){},
        update: function(e){
            a.value = e.target.a;
            b.value = e.target.b;
        },
        complete: function(e){}
    });

## パブリックメソッド

### Tween()
名前空間としてknockknock.jpにTween関数を定義しています。まずはこちらを実行して、戻り値を変数に格納してください。

#### 引数
1. `{}` : 対象となるオブジェクト

#### 戻り値
* `play` : function
* `stop` : function

### play()
*トゥイーンを開始します。*

#### 引数
1. `{}` : 変化を与えたいプロパティと変化量をオブジェクトに格納してください。
2. `{}` : イージング関数と時間、各種コールバックをそれぞれオブジェクトに格納してください。（省略可）
    * `easing` : イージング関数（デフォルト値 : knockknock.jp.Easing.linear）
    * `duration` : 時間（ms）（デフォルト値 : 1000）
    * `play` : トゥイーン開始時に呼び出されるコールバック関数（省略可）
    * `update` : 値が変更される度に呼び出されるコールバック関数（省略可）
    * `complete` : トゥイーン終了時に呼び出されるコールバック関数（省略可）

#### 戻り値
なし

### stop()
*トゥイーンを停止します。*

#### 引数
なし

#### 戻り値
なし

## イージング関数

* `knockknock.jp.Easing.linear`

### Sine
* `knockknock.jp.Easing.sineEaseIn`
* `knockknock.jp.Easing.sineEaseInOut`
* `knockknock.jp.Easing.sineEaseOut`
* `knockknock.jp.Easing.sineEaseOutIn`

### Quadratic
* `knockknock.jp.Easing.quadraticEaseIn`
* `knockknock.jp.Easing.quadraticEaseInOut`
* `knockknock.jp.Easing.quadraticEaseOut`
* `knockknock.jp.Easing.quadraticEaseOutIn`

### Cubic
* `knockknock.jp.Easing.cubicEaseIn`
* `knockknock.jp.Easing.cubicEaseInOut`
* `knockknock.jp.Easing.cubicEaseOut`
* `knockknock.jp.Easing.cubicEaseOutIn`

### Quartic
* `knockknock.jp.Easing.quarticEaseIn`
* `knockknock.jp.Easing.quarticEaseInOut`
* `knockknock.jp.Easing.quarticEaseOut`
* `knockknock.jp.Easing.quarticEaseOutIn`

### Quintic
* `knockknock.jp.Easing.quinticEaseIn`
* `knockknock.jp.Easing.quinticEaseInOut`
* `knockknock.jp.Easing.quinticEaseOut`
* `knockknock.jp.Easing.quinticEaseOutIn`

### Exponential
* `knockknock.jp.Easing.exponentialEaseIn`
* `knockknock.jp.Easing.exponentialEaseInOut`
* `knockknock.jp.Easing.exponentialEaseOut`
* `knockknock.jp.Easing.exponentialEaseOutIn`

### Circular
* `knockknock.jp.Easing.circularEaseIn`
* `knockknock.jp.Easing.circularEaseInOut`
* `knockknock.jp.Easing.circularEaseOut`
* `knockknock.jp.Easing.circularEaseOutIn`

### Elastic
* `knockknock.jp.Easing.elasticEaseIn`
* `knockknock.jp.Easing.elasticEaseInOut`
* `knockknock.jp.Easing.elasticEaseOut`
* `knockknock.jp.Easing.elasticEaseOutIn`

### Back
* `knockknock.jp.Easing.backEaseIn`
* `knockknock.jp.Easing.backEaseInOut`
* `knockknock.jp.Easing.backEaseOut`
* `knockknock.jp.Easing.backEaseOutIn`

### Bounce
* `knockknock.jp.Easing.bounceEaseIn`
* `knockknock.jp.Easing.bounceEaseInOut`
* `knockknock.jp.Easing.bounceEaseOut`
* `knockknock.jp.Easing.bounceEaseOutIn`
