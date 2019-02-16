
var componentList = Vue.component('list-item', {
    
    model : {
        props : ['click'],
        event : 'click'
    },
    template: ' <li class="btn span1">+</li>',
})

let player = [
    { id: "player1", skor: 0, turn: 1 , listTicTact : [], symbol: 'o'},
    { id: "player2", skor: 0, turn: 0 , listTicTact : [], symbol: 'x'}
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
        },
        resetGame(){
            $("#game li").text("+");
            $("#game li").removeClass('disable')
            $("#game li").removeClass('o')
            $("#game li").removeClass('x')
            $("#game li").removeClass('btn-primary')
            $("#game li").removeClass('btn-info')

            this.player.forEach(element => {
                element.listTicTact = [];
            });

            this.game.turn = 0;
            this.gameReset = false;
        },
        tictactoe: function(events){
            if(this.isStart){
                if($(event.target).hasClass('disable')){
                    alert('Already selected');
                } else {
                    $(event.target).addClass('disable o btn-primary');
                    $(event.target).text(this.player[this.game.turn % 2].symbol);
                    
                    let turnPlayer = this.player[this.game.turn % 2];
              
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
                    intersectionValue.length === 3 ? status = true : false;
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