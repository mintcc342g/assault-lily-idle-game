# Assault Lily Idle Game Project

<br/>

- Contents
    - [한국어](#어설트-릴리-방치형-게임)
        - [플레이어블 캐릭터](#플레이어블-캐릭터)
        - [기능](#기능)
        - [조작법](#조작법)
        - [게임 개발정보](#게임-개발정보)
        - [라이선스](#라이선스)
    - [English](#Assault-Lily-Idle-Game)
        - [Playable Character List](#Playable-Character-List)
        - [Available Features](#Available-Features)
        - [Manual](#Manual)
        - [Dev Info](#Dev-Info)
        - [License](#License)
    - [日本語](#アサルトリリィ放置系ゲーム)
        - [プレイアブルキャラクター](#プレイアブルキャラクター)
        - [機能](#機能)
        - [操作](#操作)
        - [ゲーム開発情報](#ゲーム開発情報)
        - [ライセンス](#ライセンス)

<br/>
<br/>
<br/>

# 어설트 릴리 방치형 게임

이 프로젝트는 일본에서 시작된 미디어믹스 프로젝트 어설트 릴리의 세계관을 기반으로 한 2차 창작 비공식 웹게임 입니다. 2D 픽셀 아트로 구현된 릴리들의 일상을 따뜻한 눈으로 지켜보아요.  

- [게임 하러 가기!](https://mintcc342g.github.io/assault-lily-idle-game/)

<br/>

## 플레이어블 캐릭터

현재 선택 가능한 캐릭터 목록입니다.
- 키시모토 루치아 라이무

<br/>

## 기능

현재 구현된 기능 목록입니다.

- 랜덤 이벤트
    - 캐릭터 랜덤 대사
        - 10~15초 사이로 랜덤하게 캐릭터가 대사를 뱉습니다.
- 학생수첩
    - 간단한 메모 작성 기능 (이 게임의 컨셉..?)
    - 최대 27자까지 입력 가능한 칸이 8개 제공됩니다.
    - 주의: 입력된 데이터는 저장되지 않으므로, 페이지를 벗어나거나 브라우저를 끌 경우 데이터가 날아갑니다.

<br/>

## 조작법

- 이 게임은 방치형 게임으로, 기본적으로 캐릭터의 조작은 불가능합니다.
- 캐릭터마다 좋아하는 휴식 장소가 있고, 쉬기 위해 그곳에 나타납니다.
- 유저는 캐릭터가 휴식하는 모습을 지켜볼 수 있습니다.

<br/>

### 메인 화면

- 언어 선택 후 'Start' 버튼을 클릭하면 캐릭터 선택 화면으로 이동합니다.
    - 디폴트 언어는 한국어

<br/>

### 캐릭터 선택화면

- 캐릭터와 캐릭터가 소속한 가든의 학생수첩이 화면에 나타납니다.
- 캐릭터 화면의 좌우 하얀색 화살표를 클릭하여 캐릭터 변경이 가능합니다.
- 캐릭터를 선택한 후 'Play' 버튼을 누르면 게임이 시작됩니다.

<br/>

### 게임 화면

- 오른쪽 상단의 학생수첩 아이콘을 클릭하면 메뉴가 열립니다.
- 현재 사용 가능한 메뉴 기능은 다음과 같습니다.
    - 학생 수첩 열기
    - 캐릭터 선택화면으로 돌아가기
    - 메인화면으로 돌아가기
    - 메뉴 닫기

<br/>

## 게임 개발정보

- 이 프로젝트는 다음의 라이브러리를 이용하여 구현되었습니다.
    - React
    - Phaser 3 (게임 엔진)
    - Grid Engine (모션 및 애니메이션)
- 이 프로젝트의 일부 이미지는 다음의 원본 이미지를 수정한 것입니다.
    - [핸드북 출처](https://opengameart.org/content/open-book-0)
    - [일부 배경 출처](https://opengameart.org/content/zelda-like-tilesets-and-sprites)
- 이 프로젝트의 캐릭터 이미지는 일본 부시로드사의 어설트 릴리 굿즈로부터 오마주 한 것입니다.
- 주의사항
    - 이 프로젝트의 개발자는 게임 개발자도 아니며, 이 프로젝트를 시작하며 js를 독학한 js 뉴비입니다.
    - 프로젝트 구조 및 코드 스타일 등이 일반적인 js 개발이나 게임 개발과 매우 상이할 가능성이 높으므로, 참고하지 않는 것을 권유드립니다. (코드리뷰 절찬 환영중!)

<br/>

## 라이선스

- 이 프로젝트는 2차 창작물이기 때문에, 어설트 릴리 프로젝트와 관련된 이미지 파일에 대해 상업적 이용을 허용하지 않습니다.
    - 예를 들어, 각 가든의 심볼 이미지, 캐릭터 이미지 등이 포함됩니다.

<br/>
<br/>
<br/>

# Assault Lily Idle Game
This project is a fan-made(unofficial) web game based on the concept of the Assault Lily project which is Japanese mixed-media franchise. Let's watch over the Lilies to be made with pixel art with loving eyes.  
- [You can play HERE!](https://mintcc342g.github.io/assault-lily-idle-game/)

<br/>

## Playable Character List

Current playable Character List
- Raimu Ruchia Kishimoto

<br/>

## Available Features

Current avaiable features
- Random Events
    - Character's random lines
        - There will be popped a text box randomly. (every 10-15 sec)
- Student's Handbook
    - a simple note
    - There are 8 input boxes. You can write characters(maximum 30) on them.
    - CAUTION: There is no servers to store data. If you leave the page(refresh too) or close the browser, you will lose your data that you inserted on the hand book.

<br/>

## Manual

- This is a idle game. That means you cannot control the character.
- All characters has a favorite place. And they would appear that place to take a break.
- You can watch them relaxing on there.

<br/>

### Main Screen

- Select the language that you want.
- If you press the 'Start' button, you can see Character Select Screen to play the game.

<br/>

### Character Selection Screen

- There will be a character and the hand book of character's garden.
- You can choose a character to click white arrow buttons which is on left and right side of the screen.
- Select a character, then press the 'Play' button to start the game.

<br/>

### Game Screen

- There is a Menu button on the top right corner.
- Current available menu fetures
    - Open the hand book
    - Go back to Character Selection Screen
    - Go back to Main Screen
    - Close the menu

<br/>

## Dev Info

- Used Libraries
    - React
    - Phaser 3
    - Grid Engine
- Some images used in this project are modified from the origin images.
    - Thanks to Min, for [the hand book](https://opengameart.org/content/open-book-0)
    - Thanks to ArMM1998, for [some background images](https://opengameart.org/content/zelda-like-tilesets-and-sprites)
- Character images is painted in homage to Bushroad company's goods.
- CAUTION
    - I'm neither a game developer or a js professionalist. I'm a real Newbie of js.
    - I can't recommend to reference this project for your js projects.
    - (Welcome Code Reviews for this project!)

<br/>

## License

- It is forbidden to use images commercially related with the Assault Lily project for this project is a unofficial fan-made game.
    - For example : each garden' symbols, character images, and so on.

<br/>
<br/>
<br/>

## アサルトリリィ放置系ゲーム
このプロジェクトはメディアミックスプロジェクト「アサルトリリィ」の世界観を元にした2次創作（非公式）のウェブゲームです。2Dピクセルアートで描かれるリリィたちの日常を暖かい目で見守ってみませんか？  
- [ゲームプレイリンク](https://mintcc342g.github.io/assault-lily-idle-game/)

<br/>

## プレイアブルキャラクター

現在プレイ可能なキャラクターリストです。
- 岸本・ルチア・来夢

<br/>

## 機能

現在具現された機能のリストです。

- ランダムイベント
    - １０～１５秒ごとに選択したキャラクターのランダム台詞が出ます。
- 生徒手帳
    - メモが作成出来ます。
    - 最大２７文字まで入力可能な８つの欄が提供されます.
    - 注意事項：ゲームに関するデータを保存するサーバーがないため、ゲームページを離れたりブラウザを消したりすると入力した内容が全部なくなりますのでご注意ください。

<br/>

## 操作

- このゲームは放置系なので、基本的にキャラクターの操作はできません。
- 全てのキャラクターは自分の好きな場所があります。
- 彼女らは休憩するためにそこを訪れます。
- ユーザーはそこで休んでいるキャラクターを見守るのが出来ます。

<br/>

### タイトル画面
- 言語を選択した後「Start」ボタンを押すとキャラクター画面に移ります。
    - デフォルト言語が韓国語なので、「ｊｐ」ボタンを押してからゲームを始めてください。

<br/>

### キャラクター選択画面
- キャラクターとキャラクターが所属したガーデンの生徒手帳が画面に出ます。
- キャラクター画面の右左にある白い矢印ボタンを押すとキャラクターの変更が可能です。
- キャラクターを選択した後「Play」を押すとゲームが始まります。

<br/>

### ゲーム画面
- 右上の生徒手帳アイコンを押すとメニューが開かれます。
- 現在使用可能な機能はこちらになります。
    - 生徒手帳を開く。
    - キャラクター選択画面にもどる。
    - タイトル画面にものる。
    - メニューを閉じる。

<br/>

## ゲーム開発情報

- このプロジェクトは以下のライブラリーを利用して作られています。
    - React
    - Phaser 3 (ゲームエンジン)
    - Grid Engine (モーションとアニメーション)
- このゲームの一部画像は以下の画像を修正して使ったものです。
    - [生徒手帳の中身の方](https://opengameart.org/content/open-book-0)
    - [一部背景画像](https://opengameart.org/content/zelda-like-tilesets-and-sprites)
- キャラクター画像はブシロード社のアサルトリリィグッズをオマージュしたものです。
- 注意事項
    - このプロジェクトの開発者はゲーム開発者でもないし、この個人プロジェクトを始めてからｊｓを独学したｊｓの完全初心者です。
    - プロジェクトスト構造やコードスタイルが一般的なｊｓの開発やゲーム開発と異なる可能性が凄く高いので、あまり参考にしないことをお勧めします。(コートレヴュー絶賛歓迎中！)

<br/>

## ライセンス

- このゲームは非公式２次創作なので、ゲームの中で使用されているアサルトリリィプロジェクト関連の画像ファイルは商業的利用を禁じています。
    - 例：ガーデンのシンボルやキャラクター画像など。