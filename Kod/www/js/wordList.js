define(function(require) {
	
	var wordList = {
		days:{ // ZAWODY - nieparzyste męskie parzyste damskie
	        1: "Aktor",
			2: "Analityczka",
			3: "Bibliotekarz",
			4: "Cukierniczka",
			5: "Drwal",
			6: "Dziennikarka",
			7: "Ekonomista",
			8: "Farmaceutka",
			9: "Grafik",
			10: "Hotelarka",
			11: "Hydraulik",
			12: "Informatyczka",
			13: "Jubiler",
			14: "Księgowa",
			15: "Kucharz",
			16: "Lekarka",
			17: "Mechanik",
			18: "Nauczycielka",
			19: "Notariusz",
			20: "Ogrodniczka",
			21: "Okulista",
			22: "Piekarka",
			23: "Pisarz",
			24: "Pielęgniarka",
			25: "Rolnik",
			26: "Sprzedawczyni",
			27: "Stolarz",
			28: "Trenerka",
			29: "Urzędnik",
			30: "Wizażystka",
			31: "Zegarmistrz",				
		},
		months:{  //czynnosci w kolejnosci jak mija dzien
			1: "wstaje",
			2: "je",
			3: "pije",
			4: "chodzi",
			5: "czyta",
			6: "słucha",
			7: "mówi",
			8: "myśli",
			9: "pisze",
			10: "śpiewa",
			11: "leży",
			12: "śpi"
		},
		year:{
			1000:{1:'źle', 2:'dobrze'},
			100:{0:'biało', 1:'żółto', 2:'pomarańczowo', 3:'brązowo', 4:'czerwono', 5:'różowo', 6:'fioletowo', 7:'niebiesko', 8:'zielono', 9:'czarno'},
			10:{},
			1:{} 
		}
	};

	return wordList;
});