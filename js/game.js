class Board{
    constructor(dimension){
        this.board=new Array(9)
        this.player='X'
        this.turn=0;
        this.dimension=dimension
        for(let i=0;i<9;i++)
            this.board[i]="N"
    }

    range(value) //A function that makes sure that a certain index is in range
    {
        if(value > 8 || value <0)
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

    check(space)
    {
        let horizontal=space-(space%this.dimension)
        let verticle = space-horizontal
        let topLeft=0;
        let bottomRight= b.board.length-1;
        let topRight = this.dimension-1;
        let bottomLeft=bottomRight-topRight

        //check horizontal
        if(this.board[horizontal] === this.board[space] && this.board[horizontal] === this.board[horizontal+1] && this.board[horizontal] === this.board[horizontal+2])
            return true;

        //check verticle
        if(this.board[verticle] === this.board[space] && this.board[verticle] === this.board[verticle+3] && this.board[verticle] === this.board[verticle+6])
            return true;
        
        let diagDr = this.dimension+1
        let diagDl = this.dimension-1
        //check diag down-right
        if((space%diagDr) === 0)
        {
            let test = true
            for(let i = 0; i < this.board.length; i+=diagDr)
            {
                //console.log(i)
                if(this.board[i] !== this.board[space])
                {    
                    test = false
                    //break;
                }
            }
            if(test)
                return true;
        }
        //check diag down-left
        if(((space%diagDl === 0) && (space%diagDr !== 0)) || ((bottomRight%2) === 0 && space === (bottomRight/2)))
        {
            let test = true;
            for(let i = topRight; i <= bottomLeft; i+=(diagDl))
            {
                if(this.board[i] !== this.board[space])
                {   console.log(i)
                    test = false
                    break;
                }
            }
            if(test)
                return true;
        }
        
        if(this.turn===this.board.length)
            return "tie"
        return false
    }

    printBoard()
    {
        let output="";
        for(let i = 0; i<9; i++)
        {
            output+=this.board[i]+" "
            if((i+1)%3 === 0)
                output+="\n\n"
        }
        console.log(output)
    }

    reset()
    {
        for(i=0;i<this.board.length;i++)
            this.board[i]='N'
        this.turn=0;
    }
}
let dim = 4
let b = new Board(dim)
let htmlBoard=document.getElementsByClassName("board")[0];
for(i = 0; i<dim-3; i++)
{
    console.log("<button type=button onclick=place("+ (i+dim).toString() +")></button>")
    htmlBoard.appendChild("<button type=button onclick=place("+ (i+dim).toString() +")></button>")
}
htmlBoard.style.setProperty("--colNum", dim)
let buttons = document.getElementsByTagName('button');



const {question} = require('readline-sync')

/*for(i=0, win=false; !win && i<9; i++)
{   
    while(!win)
    {
        num = parseInt(question("Please enter a number"))
        test = b.place(num)
        b.printBoard()
        win=b.check(num)
        console.log(win)
    }
}*/

function reset() {
    for(i=0;i<9;i++)
        buttons[i].innerHTML="";
    b.reset()
}

function place(pos)
{
    player=b.place(pos)
    if(player!="")
        buttons[pos].innerHTML=player;

    win = b.check(pos);
    if(win ==="tie")
    {
        setTimeout(window.alert("Tie"), 50)
        reset();
    }
    if(win)
    {
        setTimeout(window.alert(player + " wins"), 50)
        reset
    }
}


