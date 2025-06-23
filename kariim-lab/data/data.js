const data = {
    "website": "Shoes",
    "categories": [
        { 
            "id": 1,
            "name" : "Yeezy",
            "image" : "Yeezy.jpg",
            "products" : [
                { "id": 1, "name" : "Yeezy 350V2 Bred", "image" : "./Pictures/Yeezy/yeezy350 blackred.jpg","price":"149.99" },
                { "id": 2, "name" : "Yeezy 350V2 BlackBlue", "image" : "./Pictures/Yeezy/yeezy350 oreo.jpg","price":"149.99" },
                { "id": 3, "name" : "Yeezy 350V2 Oreo", "image" : "./Pictures/Yeezy/yeezy350 blackorange.jpg","price":"149.99" },
                { "id": 4, "name" : "Yeezy 350V2 Zebra", "image" : "./Pictures/Yeezy/zebra.png","price":"149.99" },
                { "id": 5, "name" : "Yeezy 350V2 Beige", "image" : "./Pictures/Yeezy/bez.jpeg","price":"149.99" }
            ]
        },
        { 
            "id": 2,
            "name" : "Adidas",
            "image" : "Adidas.jpg",
            "products" : [
                { "id": 6, "name" : "Adidas B300 Black", "image" : "./Pictures/Adidas/black.jpeg","price":"79.99" },
                { "id": 7, "name" : "Adidas B300 Red", "image" : "./Pictures/Adidas/red.jpeg","price":"79.99" },
                { "id": 8, "name" : "Adidas Asin Black", "image" : "./Pictures/Adidas/black2.jpeg","price":"99.99" },
                { "id": 9, "name" : "Adidas A100 Blue", "image" : "./Pictures/Adidas/blue.jpeg","price":"139.99" },
                { "id": 10, "name" : "Adidas Stan Smith", "image" : "./Pictures/Adidas/white.jpeg","price":"69.99" }
            ]
        },
        { 
            "id": 3,
            "name" : "Nike",
            "image" : "Nike.jpg",
            "products" : [
                { "id": 11, "name" : "Nike Dunk Low Red", "image" : "./Pictures/Nike/red.jpeg","price":"79.99" },
                { "id": 12, "name" : "Nike Dunk Blue", "image" : "./Pictures/Nike/blue.jpeg","price":"79.99" },
                { "id": 13, "name" : "Nike Dunk High Gray", "image" : "./Pictures/Nike/gray.jpeg","price":"99.99" },
                { "id": 14, "name" : "Nike Dunk Orange", "image" : "./Pictures/Nike/orange.jpeg","price":"139.99" },
                { "id": 15, "name" : "Nike Air Fast", "image" : "./Pictures/Nike/bez.jpeg","price":"69.99" }
            ]
        },
        { 
            "id": 4,
            "name" : "Off White",
            "image" : "Off White.jpg",
            "products" : [
                { "id": 16, "name" : "Off White Black", "image" : "./Pictures/Off White/black.jpeg","price":"79.99" },
                { "id": 17, "name" : "Off White Green", "image" : "./Pictures/Off White/green.jpeg","price":"79.99" },
                { "id": 18, "name" : "Off White White", "image" : "./Pictures/Off White/white.jpeg","price":"79.99" },
                { "id": 19, "name" : "Off White Pink", "image" : "./Pictures/Off White/pink.jpeg","price":"79.99" },
                { "id": 20, "name" : "Off White Black", "image" : "./Pictures/Off White/black.jpeg","price":"79.99" }
            ]
        },
        { 
            "id": 5,
            "name" : "McQueen",
            "image" : "Mcqueen.jpg",
            "products" : [
                { "id": 21, "name" : "Mcqueen blue", "image" : "./Pictures/McQueen/blue.jpeg","price":"79.99" },
                { "id": 22, "name" : "Mcqueen black", "image" : "./Pictures/McQueen/black.jpeg","price":"79.99" },
                { "id": 23, "name" : "Mcqueen Pink", "image" : "./Pictures/McQueen/pink.jpeg","price":"79.99" },
                { "id": 24, "name" : "Mcqueen White", "image" : "./Pictures/McQueen/white.jpeg","price":"79.99" },
                { "id": 25, "name" : "Mcqueen Gold", "image" :"./Pictures/McQueen/gold.jpeg","price":"79.99" }
            ]
        },
        { 
            "id": 6,
            "name" : "New Balance",
            "image" : "New Balance.jpg",
            "products" : [
                { "id": 26, "name" : "New Balance black Ego", "image" : "./Pictures/New Balance/black.jpeg","price":"79.99" },
                { "id": 27, "name" : "New Balance black 530", "image" : "./Pictures/New Balance/black2.jpeg","price":"79.99" },
                { "id": 28, "name" : "New Balance blue 530", "image" : "./Pictures/New Balance/blue.jpeg","price":"79.99" },
                { "id": 29, "name" : "New Balance blue Async ", "image" : "./Pictures/New Balance/blue2.jpeg","price":"79.99" },
                { "id": 30, "name" : "Mcqueen Gold ", "image" :"./Pictures/New Balance/black.jpeg","price":"79.99" }
            ]
        },
        { 
            "id": 7,
            "name" : "Air Jordan",
            "image" : "New Balance.jpg",
            "products" : [
                { "id": 31, "name" : "Air Jordan Black", "image" : "./Pictures/Air Jordan/black.jpeg","price":"79.99" },
                { "id": 32, "name" : "Air Jordan White", "image" : "./Pictures/Air Jordan/white.jpeg","price":"79.99" },
                { "id": 33, "name" : "Air Jordan Brown", "image" : "./Pictures/Air Jordan/brown.jpeg","price":"79.99" },
                { "id": 34, "name" : "Air Jordan Red", "image" : "./Pictures/Air Jordan/red.jpeg","price":"79.99" },
                { "id": 35, "name" : "Air Jordan Blue", "image" :"./Pictures/Air Jordan/blue.jpeg","price":"79.99" }
            ]
        },
        { 
            "id": 8,
            "name" : "Hoka",
            "image" : "Hoka.jpg",
            "products" : [
                { "id": 36, "name" : "Hoka White", "image" : "./Pictures/Hoka/white.jpeg","price":"79.99" },
                { "id": 37, "name" : "Hoka Gray", "image" : "./Pictures/Hoka/gray.jpeg","price":"79.99" },
                { "id": 38, "name" : "Hoka Pink", "image" : "./Pictures/Hoka/pink.jpeg","price":"79.99" },
                { "id": 39, "name" : "Hoka Orange", "image" : "./Pictures/Hoka/orange.jpeg","price":"79.99" },
                { "id": 40, "name" : "Hoka Black", "image" :"./Pictures/Hoka/black.jpeg","price":"79.99" }
            ]
        },
        { 
            "id": 9,
            "name" : "Converse",
            "image" : "Converse.jpg",
            "products" : [
                { "id": 41, "name" : "Converse All Star White Low", "image" : "./Pictures/Converse/white.jpeg","price":"79.99" },
                { "id": 42, "name" : "Converse All Star Black Low", "image" : "./Pictures/Converse/black low.jpeg","price":"79.99" },
                { "id": 43, "name" : "Converse All Star Black High", "image" : "./Pictures/Converse/black high.jpeg","price":"79.99" },
                { "id": 44, "name" : "Converse All Star Beige Low", "image" : "./Pictures/Converse/bez low.jpeg","price":"79.99" },
                { "id": 45, "name" : "Converse All Star Beige High", "image" :"./Pictures/Converse/bez high.jpeg","price":"79.99" }
            ]
        },
        { 
            "id": 10,
            "name" : "Loewe",
            "image" : "Hoka.jpg",
            "products" : [
                { "id": 46, "name" : "Loewe White", "image" : "./Pictures/Loewe/white.jpg","price":"79.99" },
                { "id": 47, "name" : "Loewe Gray", "image" : "./Pictures/Loewe/gray.jpg","price":"79.99" },
                { "id": 48, "name" : "Loewe Green", "image" : "./Pictures/Loewe/green.jpg","price":"79.99" },
                { "id": 49, "name" : "Loewe Blue", "image" : "./Pictures/Loewe/blue.jpg","price":"79.99" },
                { "id": 50, "name" : "Loewe Black", "image" :"./Pictures/Loewe/black.jpg","price":"79.99" }
            ]
        }
    ]
}

module.exports = data;






































































































































































































