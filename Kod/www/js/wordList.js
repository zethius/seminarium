define(function(require) {
	
	var wordList = {
		days:[
			"Adam",
			"Babcia",
			"Bibliotekarka",
			"Biolog",
			"Drwal",
			"Dyrektor",
			"Dziadek",
			"Ewa",
			"Hotelarz",
			"Hydraulik",
			"Kominiarz",
			"Kot",
			"Ksiądz",
			"Kuzyn",
			"Listonosz",
			"Lekarz",
			"Mama",
			"Malarz",
			"Mechanik",		
			"Minister",
			"Napoleon",
			"Nauczycielka",
			"Ogrodnik",
			"Pies",
			"Prezydent",
			"Rzeźbiarz",
			"Sąsiad",
			"Słoń",
			"Sprzątaczka",
			"Sprzedawca",		
			"Tata"							
		],
		months:[
			"biegnie",
			"czyta",
			"słucha",
			"je",
			"rozmawia",
			"śpiewa",
			"pije",
			"myśli",
			"pisze",
			"",
		],
		year:[ 
			"kolorowo", //0
			"głośno", 
			"ślicznie",
			"wolno", //3 
			"radośnie",
			"słodko", //5
			"swojsko",
			"natarczywie",//7
			"uważnie",
			"pokracznie" //9
		]
		//1934 = głośno,  pokracznie, wolno, radośnie
		//dla dwoch cyfr obok siebie dodajemy "bardzo", dla trzech "bardzo mocno" 
		//np 1993 = głośno, bardzo pokracznie, wolno
		//1999 = głośno, bardzo mocno pokracznie
	};

	return wordList;
});