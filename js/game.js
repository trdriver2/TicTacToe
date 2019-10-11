class Board{
    constructor(dimension){
        this.board=new Array(dimension*dimension)
        this.player='X'
        this.turn=0;
        this.dimension=dimension
        this.gameOver=false
        for(let i=0;i<this.board.length;i++)
            this.board[i]="N"
    }

    range(value) //A function that makes sure that a certain index is in range
    {
        if(value > (this.board.length-1) || value <0)
            return false
        return true
    }

    place(space)
    {
        if(!this.range(space))
        {
            console.log("The value that you provided is not in range")
            console.log("Please give a value that is 0-8")
            return ""   
        }
        if(this.board[space]!== "N")
        {
            console.log("That space is allready taken by", this.board[space], ",\npick another")
            return ""
        }

        this.board[space]=this.player
        if(this.player=='X')
            this.player='O'
        else
            this.player='X'
        this.turn++;
        return this.board[space];
    }

    midCheck(init, space, additive)
    {
        let end=init+((additive)*(this.dimension))
        for(let i = init; i < end; i+=additive)
        {
            //console.log(i, this.board[i] !== this.board[space])
            if(this.board[i] !== this.board[space])
                return false
        }
        console.log("made it")
        return true
    }
    check(space)
    {
        let horizontal=space-(space%this.dimension)
        let verticle = space-horizontal
        let topLeft=0;
        let bottomRight= b.board.length-1;
        let topRight = this.dimension-1;
        let bottomLeft=bottomRight-topRight
        //check horizontal
        if(this.midCheck(horizontal,space,1))
            return true;
        
        //check verticle
        if(this.midCheck(verticle,space,this.dimension))
            return true;
        
        //console.log(verticle)
        //console.log(((space-verticle)/(this.dimension)))
        console.log(verticle === ((space-verticle)/(this.dimension)))

        let diagDr = this.dimension+1
        let diagDl = this.dimension-1
        //check diag down-right
        if((verticle === ((space-verticle)/(this.dimension))) && this.midCheck(topLeft,space,diagDr))
            return true
        //check diag down-left
        if(((this.dimension-verticle)-1 === ((space-verticle)/(this.dimension))) && this.midCheck(topRight,space,diagDl))
            return true
        
        if(this.turn===this.board.length)
            return "tie"
        
        return false
    }

    printBoard()
    {
        let output="";
        for(let i = 0; i<this.board.length; i++)
        {
            output+=this.board[i]+" "
            if((i+1)%3 === 0)
                output+="\n\n"
        }
        //console.log(output)
    }

    reset()
    {
        for(i=0;i<this.board.length;i++)
            this.board[i]='N'
        this.turn=0;
        this.gameOver=false
    }
}
let dim = 3
let b = new Board(dim)
let htmlBoard=document.getElementsByClassName("board")[0];

let pass = ''
for(i = 0; i<(dim*dim)-9; i++)
{
    pass=document.createRange().createContextualFragment("<button type=button onclick=place("+ (i+9).toString() +")></button>")
    htmlBoard.appendChild(pass)
}
    htmlBoard.style.setProperty("--num", dim)
let buttons = document.getElementsByTagName('button');

function reset() {
    for(i=0;i<(dim*dim);i++)
        buttons[i].innerHTML="";
    b.reset()
    this.gameOver=false
}

function place(pos)
{
    if(this.gameOver)
        return null
    player=b.place(pos)
    if(player!="")
        buttons[pos].innerHTML=player;

    win = b.check(pos);
    if(win ==="tie")
    {
        setTimeout(window.alert("Tie"), 50)
        this.gameOver=true
    }
    if(win === true)
    {
        setTimeout(window.alert(player + " wins"), 50)
        this.gameOver=true
    }
}


