import { Component } from "@angular/core";
import Deck from "./../classes/Deck";
import ICard from "./../interfaces/ICard";

@Component({
	selector: "application",
	templateUrl: "./app.html"
})
export class AppComponent {
	private deck = new Deck();
	public drawnCards = [];
	private lastCard:ICard;
	public lastCardDisp = 'N/A';
	public returned:ICard;
	public lifeBarStyle:object = {
		'height' : '46.281px',
		'background-color' : 'green'
	}
	private bgColor;
	private setLife() {
		if (this.drawnCards.length < 26) {
			this.bgColor = 'green';
		} else if (this.drawnCards.length < 40) {
			this.bgColor = '#f1c812';
		} else {
			this.bgColor = 'red';
		}
		this.lifeBarStyle = {
			'background-color' : this.bgColor,
			'height' : (46.281 * (52 - this.drawnCards.length) / 52) + 'px'
		}
	}

	public userDrawCard() {
		this.lastCard = this.deck.drawCard();
		this.lastCardDisp = `${this.lastCard.rank} of ${this.lastCard.suit}`;
		this.drawnCards.push(this.lastCard);
		this.setLife();	
	}
	public userReturnCard(index) {
		this.returned = this.drawnCards[index];
		this.drawnCards.splice(index, 1);
		this.deck.returnCardToDeck(this.returned);
		console.log(this.returned);
		this.setLife();
	}
}
