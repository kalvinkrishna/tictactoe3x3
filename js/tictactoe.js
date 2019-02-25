
var componentList = Vue.component('board-item', {
    
    model : {
        props : ['click'],
        event : 'click'
    },
    template: ' <div class="board">+</div>',
})

let player = [
    { id: "player1", skor: 0, turn: 1 , listTicTact : [], symbol: 'o', playercolor: 'red'},
    { id: "player2", skor: 0, turn: 0 , listTicTact : [], symbol: 'x', playercolor: 'blue'}
];

var appComponent = new Vue ({
    el : "#gametictactoe",
    data : {
        player : player,
        game : {
            score : 0,
            gameBoard: 3,
            turn: 0
        },
        gameReset: false,
        isStart : false,
        minWinningTurn : 0,
        listingWinning : [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [4,5,6],
            [1,5,9],
            [3,5,7]
        ]
    },
    methods : {
        startGame : function(event){
            this.isStart = true,
            this.minWinningTurn = (this.game.gameBoard * 2) - 1;
            $(event.target).html("Game Start");
            this.generateBoard();

            $("#reset").show();
        },
        generateBoard(){
            
            var frame = document.getElementById('board');
            frame.style.width = (this.game.gameBoard * 100) + "px";
            frame.style.height = (this.game.gameBoard * 100) + "px";
            frame.innerHTML = "";

            for(var i=1;i<= Math.pow(this.game.gameBoard,2) ; i++){
                frame.innerHTML += '<div class="boardcell" id='+i+'></div>';
            }
         
            var boardcell = document.getElementsByClassName('boardcell');

            var self = this;
           
            for(var i = 0 ; i< Math.pow(this.game.gameBoard,2); i++){
                    boardcell[i].addEventListener('click',function(){
                        self.tictactoe();
                    });
            }
            
            
        },
        changeColor: function(){

        },
        resetGame : function(){
            var frame = document.getElementById('board');
            $("#game li").text("+");
            $("#game li").removeClass('disable')
            $("#game li").removeClass('o')
            $("#game li").removeClass('x')
            $("#game li").removeClass('btn-primary')
            $("#game li").removeClass('btn-info')

            this.player.forEach(element => {
                element.listTicTact = [];
            });
            frame.innerHTML = "";
            this.game.turn = 0;
            this.gameReset = false;
            $("#reset").hide();
            
        },
        tictactoe: function(){
            
            if(this.isStart){
                if($(event.target).hasClass('disable')){
                    alert('Already selected');
                } else {
                    $(event.target).addClass('disable o btn-primary');
                    $(event.target).html("<span>"+this.player[this.game.turn % 2].symbol+"</span>");
                    
                    let turnPlayer = this.player[this.game.turn % 2];

                    $(event.target).css({
                        "backgroundColor" : ""+turnPlayer.playercolor,
                        "background-image": "none",    
                    });
                    
              
                     //butuh pengambilan status dari tombol yang di klik
                    turnPlayer.listTicTact.push(parseInt(event.target.id));
                    if(this.game.turn >= this.minWinningTurn - 1 && this.game.turn <= Math.pow(this.game.gameBoard,2)){
                        if(this.checkWinning(turnPlayer)){
                            turnPlayer.skor += 1;
                            alert("Player "+ turnPlayer.symbol+ " Won ");
                            this.gameReset = true;
                        } else if(this.game.turn >= Math.pow(this.game.gameBoard,2) - 1){
                            alert("Game Tie");
                            this.gameReset = true;
                        }
                    }
                    this.gameReset ? this.resetGame() : this.game.turn++;
                }
            } else {
                return alert("Please Klik Start First");
            }

        },

        checkWinning: function(player){
            if(player) {
                var status = false;
                this.listingWinning.forEach(element => {
                    let intersectionValue = this.intersection(element,player.listTicTact);
                    intersectionValue.length === this.game.gameBoard ? status = true : false;
                });
                return status;
            } else {
                return false;
            }
        },

        intersection : function(element, list){
            return element.filter(function (e) {
                return list.indexOf(e) > -1;
            });
        }

    }
});