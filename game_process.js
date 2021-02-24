var mas_n = 15;
var banmen;
var banmen_r;
var turn_flag;
var turn_num;

function createBanmen() {
  banmen = Array.from(new Array(mas_n), () => new Array(mas_n).fill(-1));
  banmen[7][7] = 0;
  console.log(banmen);
  turn_flag = 0; //0->先手 1->後手
  turn_num = 0; //初手判定
  /* デバッグ用 */
  gameTurn(6, 8); //2
  gameTurn(10, 10); //1
  gameTurn(5, 6); //2
  gameTurn(9, 9); //1
  gameTurn(9, 0); //2
  gameTurn(8, 8); //1
  gameTurn(9, 3); //2
  gameTurn(6, 6); //1
  gameTurn(6, 0); //2
  gameTurn(5, 8); //1
}

function gameTurn(mas_x, mas_y) {
  if (turn_num == 0) {
    if (eval_Ineq(6, 8, mas_x) && eval_Ineq(6, 8, mas_y)) {
      if (banmen[mas_x][mas_y] != -1) {
        alert("このマスは既に選択されています.");
      } else {
        banmen[mas_x][mas_y] = 1;
        turn_num++;
        turn_flag = 1;
      }
      console.log(banmen);
    }
  } else {
    if (banmen[mas_x][mas_y] != -1) {
      alert("このマスは既に選択されています.");
    } else {
      banmen[mas_x][mas_y] = turn_flag;
      gomokuJudgement(mas_x, mas_y);
      turn_flag = (turn_flag + 1) % 2
      turn_num++;
    }
    console.log(banmen);
  }
}

function gomokuJudgement(mas_x, mas_y) {
  var count = 0;

  // [-]方向判定
  for (var i = 0; i < mas_n; i++) {
    if (banmen[mas_x][i] == turn_flag) {
      count++;
      if (count >= 5) {
        gameResult();
        console.log("-");
        break;
      }
    } else {
      count = 0;
    }
  }
  // [|]方向判定
  for (var i = 0; i < mas_n; i++) {
    if (banmen[i][mas_y] == turn_flag) {
      count++;
      if (count >= 5) {
        gameResult();
        console.log("|");
        break;
      }
    } else {
      count = 0;
    }
  }
  // [\]方向判定
  var judge_x = 0;
  var judge_y = 0;
  if (mas_x > mas_y) {
    judge_x = mas_x - mas_y;
  } else if (mas_y > mas_x) {
    judge_y = mas_y - mas_x;
  }
  for (var i = 0; i < mas_n - (judge_x + judge_y); i++) {
    if (banmen[judge_x + i][judge_y + i] == turn_flag) {
      count++;
      if (count >= 5) {
        gameResult();
        console.log("__");
        break;
      }
    } else {
      count = 0;
    }
  }
  // [/]方向判定
  judge_x = 0;
  judge_y = 0;
  var mas_xr = 7;
  if (mas_x > 7) {
    mas_xr = 14 - mas_x;
  } else if (mas_x < 7) {
    mas_xr = 7 - mas_x + 7;
  }
  if (mas_xr > mas_y) {
    judge_x = mas_xr - mas_y;
  } else if (mas_y > mas_xr) {
    judge_y = mas_y - mas_xr;
  }
  banmen_r = banmen.slice().reverse();
  //console.log(banmen_r);
  for (var i = 0; i < mas_n - (judge_x + judge_y); i++) {
    //console.log(judge_x,judge_y);
    if (banmen_r[judge_x + i][judge_y + i] == turn_flag) {
      count++;
      if (count >= 5) {
        gameResult();
        console.log("/");
        break;
      }
    } else {
      count = 0;
    }
  }
}

function onClick(e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  check_coord(x, y);
  //console.log(x, y);
}

function check_coord(x, y) {

}

function eval_Ineq(a, b, n) {
  return a <= n && n <= b;
}

function gameResult() {
  console.log("WIN: " + turn_flag);
}


function gameStart() {
  createBanmen();
}

window.onload = function () {
  gameStart();
}