define(function(require) {
	
	var wordList = {
		days:{ // ZAWODY - nieparzyste męskie parzyste damskie
	        1: 'Aktor',
			2: 'Analityczka',
			3: 'Bibliotekarz',
			4: 'Cukierniczka',
			5: 'Drwal',
			6: 'Dziennikarka',
			7: 'Ekonomista',
			8: 'Farmaceutka',
			9: 'Grafik',
			10: 'Hotelarka',
			11: 'Hydraulik',
			12: 'Informatyczka',
			13: 'Jubiler',
			14: 'Księgowa',
			15: 'Kucharz',
			16: 'Lekarka',
			17: 'Mechanik',
			18: 'Nauczycielka',
			19: 'Notariusz',
			20: 'Ogrodniczka',
			21: 'Okulista',
			22: 'Piekarka',
			23: 'Pisarz',
			24: 'Pielęgniarka',
			25: 'Rolnik',
			26: 'Sprzedawczyni',
			27: 'Stolarz',
			28: 'Trenerka',
			29: 'Urzędnik',
			30: 'Wizażystka',
			31: 'Zegarmistrz',				
		},
		months:{  //czynnosci skojarzone z danym miesiacem
			1: 'odśnieża',
			2: 'randkuje',
			3: 'sprząta',
			4: 'żartuje',
			5: 'grilluje',
			6: 'odpoczywa',
			7: 'podróżuje',
			8: 'pływa',
			9: 'uczy',
			10: 'spaceruje',
			11: 'grabi',
			12: 'świętuje',
		},
		year:{
			1000:{
				1: 'bardzo', 
				2: 'mocno'
			},
			100:{
				0: 'autentycznie', 
				1: 'bezmyślnie', 
				2: 'cicho', 
				3: 'dziwnie', 
				4: 'energicznie', 
				5: 'fatalnie', 
				6: 'głupio', 
				7: 'hałaśliwie', 
				8: 'intensywnie', 
				9: 'jednolicie'
			},
			10:{
				0: 'biało', 
				1: 'żółto', 
				2: 'pomarańczowo',
				3: 'brązowo',
				4: 'czerwono',
				5: 'różowo',
				6: 'fioletowo',
				7: 'niebiesko',
				8: 'zielono',
				9: 'czarno'
			},
			1:{
				0: 'w lesie', 
				1: 'w szałasie', 
				2: 'w namiocie', 
				3: 'w chacie', 
				4: 'w bloku', 
				5: 'w domu', 
				6: 'w apartamencie', 
				7: 'w willi', 
				8: 'w rezydencji', 
				9: 'w pałacu'
			} 
		}
	};

	return wordList;
});