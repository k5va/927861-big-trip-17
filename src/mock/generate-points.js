const generatePoints = () => JSON.parse(`
[
  {
      "id": "0",
      "type": "taxi",
      "date_from": "2022-04-28T17:03:18.133Z",
      "date_to": "2022-04-29T04:54:31.181Z",
      "destination": {
          "name": "Paris",
          "description": "Paris, is a beautiful city.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.4646432103851523",
                  "description": "Paris kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8983348332176038",
                  "description": "Paris central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.10241307729444094",
                  "description": "Paris parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.42198813872499463",
                  "description": "Paris parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5059031710624347",
                  "description": "Paris parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7882315334513668",
                  "description": "Paris parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.12321359089777695",
                  "description": "Paris embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9348386205052006",
                  "description": "Paris zoo"
              }
          ]
      },
      "base_price": 600,
      "is_favorite": false,
      "offers": [
          {
              "id": 2,
              "title": "Choose the radio station",
              "price": 30
          },
          {
              "id": 3,
              "title": "Choose temperature",
              "price": 170
          },
          {
              "id": 5,
              "title": "Drive slowly",
              "price": 110
          }
      ]
  },
  {
      "id": "1",
      "type": "sightseeing",
      "date_from": "2022-04-29T04:54:31.181Z",
      "date_to": "2022-04-29T21:46:49.383Z",
      "destination": {
          "name": "Den Haag",
          "description": "Den Haag, is a beautiful city, with crowded streets, with a beautiful old town, middle-eastern paradise.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.18299398361305963",
                  "description": "Den Haag parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.13927218868882796",
                  "description": "Den Haag biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5204728480102405",
                  "description": "Den Haag biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5830688484095623",
                  "description": "Den Haag zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.12023628226239902",
                  "description": "Den Haag central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.46208861645401234",
                  "description": "Den Haag parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.43336006280319417",
                  "description": "Den Haag embankment"
              }
          ]
      },
      "base_price": 900,
      "is_favorite": true,
      "offers": []
  },
  {
      "id": "2",
      "type": "train",
      "date_from": "2022-04-29T21:46:49.383Z",
      "date_to": "2022-04-30T11:55:10.450Z",
      "destination": {
          "name": "Vien",
          "description": "Vien, with crowded streets, middle-eastern paradise.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.5825297523045017",
                  "description": "Vien central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.045561887333604556",
                  "description": "Vien zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4826597984241987",
                  "description": "Vien street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9160660238646503",
                  "description": "Vien city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8503206563218453",
                  "description": "Vien kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.45452918870344305",
                  "description": "Vien kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1425619124106905",
                  "description": "Vien biggest supermarket"
              }
          ]
      },
      "base_price": 900,
      "is_favorite": false,
      "offers": [
          {
              "id": 1,
              "title": "Book a taxi at the arrival point",
              "price": 110
          },
          {
              "id": 2,
              "title": "Order a breakfast",
              "price": 80
          },
          {
              "id": 3,
              "title": "Wake up at a certain time",
              "price": 140
          }
      ]
  },
  {
      "id": "3",
      "type": "check-in",
      "date_from": "2022-04-30T11:55:10.450Z",
      "date_to": "2022-04-30T19:36:27.338Z",
      "destination": {
          "name": "Sochi",
          "description": "Sochi, is a beautiful city, in a middle of Europe, full of of cozy canteens where you can try the best coffee in the Middle East.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.6602411152720811",
                  "description": "Sochi street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.10238953055172995",
                  "description": "Sochi city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9525770176167192",
                  "description": "Sochi parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.18140938306005006",
                  "description": "Sochi central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.37571952699052047",
                  "description": "Sochi central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8972248482480829",
                  "description": "Sochi zoo"
              }
          ]
      },
      "base_price": 700,
      "is_favorite": true,
      "offers": [
          {
              "id": 3,
              "title": "Add breakfast",
              "price": 110
          },
          {
              "id": 4,
              "title": "Laundry",
              "price": 140
          },
          {
              "id": 5,
              "title": "Order a meal from the restaurant",
              "price": 30
          }
      ]
  },
  {
      "id": "4",
      "type": "taxi",
      "date_from": "2022-04-30T19:36:27.338Z",
      "date_to": "2022-05-01T08:27:00.167Z",
      "destination": {
          "name": "Moscow",
          "description": "Moscow, with crowded streets, a perfect place to stay with a family.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.1834790698342028",
                  "description": "Moscow kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.32813990926523817",
                  "description": "Moscow zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6376217561524382",
                  "description": "Moscow park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.17100998352134855",
                  "description": "Moscow kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.42862284336619116",
                  "description": "Moscow street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1129682515424173",
                  "description": "Moscow embankment"
              }
          ]
      },
      "base_price": 1100,
      "is_favorite": false,
      "offers": [
          {
              "id": 1,
              "title": "Upgrade to a business class",
              "price": 190
          },
          {
              "id": 2,
              "title": "Choose the radio station",
              "price": 30
          },
          {
              "id": 3,
              "title": "Choose temperature",
              "price": 170
          }
      ]
  },
  {
      "id": "5",
      "type": "train",
      "date_from": "2022-05-01T08:27:00.167Z",
      "date_to": "2022-05-01T10:44:24.076Z",
      "destination": {
          "name": "Naples",
          "description": "Naples, a true asian pearl, in a middle of Europe.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.9532711563042322",
                  "description": "Naples embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7723474119527138",
                  "description": "Naples city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9826048090416724",
                  "description": "Naples zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8149197606457683",
                  "description": "Naples zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6151563790510999",
                  "description": "Naples central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4256706472737486",
                  "description": "Naples biggest supermarket"
              }
          ]
      },
      "base_price": 1100,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "Book a taxi at the arrival point",
              "price": 110
          },
          {
              "id": 2,
              "title": "Order a breakfast",
              "price": 80
          },
          {
              "id": 3,
              "title": "Wake up at a certain time",
              "price": 140
          }
      ]
  },
  {
      "id": "6",
      "type": "ship",
      "date_from": "2022-05-01T10:44:24.076Z",
      "date_to": "2022-05-02T08:33:47.648Z",
      "destination": {
          "name": "Naples",
          "description": "Naples, is a beautiful city.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.15314362539085002",
                  "description": "Naples city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1253815595035903",
                  "description": "Naples city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6005719520405581",
                  "description": "Naples park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7934837501536725",
                  "description": "Naples zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8518213831520329",
                  "description": "Naples park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9816211026291581",
                  "description": "Naples central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9123501784598518",
                  "description": "Naples zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1366188784941429",
                  "description": "Naples biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.43182390291557526",
                  "description": "Naples biggest supermarket"
              }
          ]
      },
      "base_price": 400,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "Choose meal",
              "price": 130
          },
          {
              "id": 3,
              "title": "Upgrade to comfort class",
              "price": 170
          },
          {
              "id": 5,
              "title": "Add luggage",
              "price": 100
          },
          {
              "id": 6,
              "title": "Business lounge",
              "price": 40
          }
      ]
  },
  {
      "id": "7",
      "type": "check-in",
      "date_from": "2022-05-02T08:33:47.648Z",
      "date_to": "2022-05-02T12:23:40.262Z",
      "destination": {
          "name": "Helsinki",
          "description": "Helsinki, a true asian pearl, with crowded streets, for those who value comfort and coziness.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.4913893442483155",
                  "description": "Helsinki street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.052095575661656346",
                  "description": "Helsinki kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4732976012387131",
                  "description": "Helsinki central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5708000408961806",
                  "description": "Helsinki biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9469630872716497",
                  "description": "Helsinki zoo"
              }
          ]
      },
      "base_price": 600,
      "is_favorite": false,
      "offers": [
          {
              "id": 1,
              "title": "Choose the time of check-in",
              "price": 70
          },
          {
              "id": 5,
              "title": "Order a meal from the restaurant",
              "price": 30
          }
      ]
  },
  {
      "id": "8",
      "type": "sightseeing",
      "date_from": "2022-05-02T12:23:40.262Z",
      "date_to": "2022-05-03T11:32:12.055Z",
      "destination": {
          "name": "Monaco",
          "description": "Monaco, in a middle of Europe, with an embankment of a mighty river as a centre of attraction.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.5137110717528874",
                  "description": "Monaco embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4621083356106346",
                  "description": "Monaco kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1707061801452583",
                  "description": "Monaco parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.44663944712814163",
                  "description": "Monaco kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9477528612855166",
                  "description": "Monaco biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7562648228796511",
                  "description": "Monaco park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8970458284674288",
                  "description": "Monaco kindergarten"
              }
          ]
      },
      "base_price": 300,
      "is_favorite": true,
      "offers": []
  },
  {
      "id": "9",
      "type": "train",
      "date_from": "2022-05-03T11:32:12.055Z",
      "date_to": "2022-05-03T16:37:45.029Z",
      "destination": {
          "name": "Naples",
          "description": "Naples, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.36579808599077346",
                  "description": "Naples parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1674995283066223",
                  "description": "Naples zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7938701542619275",
                  "description": "Naples street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1043821239106617",
                  "description": "Naples city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.06843458000675362",
                  "description": "Naples zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9005758414505107",
                  "description": "Naples embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8238409860008746",
                  "description": "Naples park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.48638914701081015",
                  "description": "Naples zoo"
              }
          ]
      },
      "base_price": 900,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "Book a taxi at the arrival point",
              "price": 110
          },
          {
              "id": 2,
              "title": "Order a breakfast",
              "price": 80
          },
          {
              "id": 3,
              "title": "Wake up at a certain time",
              "price": 140
          }
      ]
  },
  {
      "id": "10",
      "type": "bus",
      "date_from": "2022-05-03T16:37:45.029Z",
      "date_to": "2022-05-04T08:26:02.211Z",
      "destination": {
          "name": "Venice",
          "description": "Venice, is a beautiful city, with crowded streets, in a middle of Europe, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.037298966430165725",
                  "description": "Venice street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.048330024365939916",
                  "description": "Venice embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8516798973977457",
                  "description": "Venice kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7463947532139474",
                  "description": "Venice street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7454650138228498",
                  "description": "Venice zoo"
              }
          ]
      },
      "base_price": 800,
      "is_favorite": false,
      "offers": [
          {
              "id": 1,
              "title": "Infotainment system",
              "price": 50
          },
          {
              "id": 2,
              "title": "Order meal",
              "price": 100
          },
          {
              "id": 3,
              "title": "Choose seats",
              "price": 190
          }
      ]
  },
  {
      "id": "11",
      "type": "train",
      "date_from": "2022-05-04T08:26:02.211Z",
      "date_to": "2022-05-04T13:03:48.427Z",
      "destination": {
          "name": "Hiroshima",
          "description": "Hiroshima, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.05703891499536562",
                  "description": "Hiroshima street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.17749680898765363",
                  "description": "Hiroshima embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6714811184899823",
                  "description": "Hiroshima city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8434365329871387",
                  "description": "Hiroshima kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.20891481526523603",
                  "description": "Hiroshima city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.13691434378152212",
                  "description": "Hiroshima parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.31176149892442573",
                  "description": "Hiroshima biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.462542984287714",
                  "description": "Hiroshima city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8576296220546193",
                  "description": "Hiroshima central station"
              }
          ]
      },
      "base_price": 500,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "Book a taxi at the arrival point",
              "price": 110
          },
          {
              "id": 2,
              "title": "Order a breakfast",
              "price": 80
          },
          {
              "id": 3,
              "title": "Wake up at a certain time",
              "price": 140
          }
      ]
  },
  {
      "id": "12",
      "type": "restaurant",
      "date_from": "2022-05-04T13:03:48.427Z",
      "date_to": "2022-05-05T04:20:51.738Z",
      "destination": {
          "name": "Barcelona",
          "description": "Barcelona, with crowded streets, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.7523527688116174",
                  "description": "Barcelona parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.023956641071052776",
                  "description": "Barcelona parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4502847414667899",
                  "description": "Barcelona city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.06395809670179498",
                  "description": "Barcelona central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.07223573718520782",
                  "description": "Barcelona city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.48557024936639914",
                  "description": "Barcelona central station"
              }
          ]
      },
      "base_price": 300,
      "is_favorite": false,
      "offers": [
          {
              "id": 1,
              "title": "Choose live music",
              "price": 150
          },
          {
              "id": 2,
              "title": "Choose VIP area",
              "price": 70
          }
      ]
  },
  {
      "id": "13",
      "type": "check-in",
      "date_from": "2022-05-05T04:20:51.738Z",
      "date_to": "2022-05-05T12:07:49.031Z",
      "destination": {
          "name": "Tokio",
          "description": "Tokio, in a middle of Europe, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.9642312398520958",
                  "description": "Tokio zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8049002821463038",
                  "description": "Tokio embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3942852755478028",
                  "description": "Tokio parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9161664010852129",
                  "description": "Tokio city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4919913570824328",
                  "description": "Tokio central station"
              }
          ]
      },
      "base_price": 800,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "Choose the time of check-in",
              "price": 70
          },
          {
              "id": 2,
              "title": "Choose the time of check-out",
              "price": 190
          },
          {
              "id": 4,
              "title": "Laundry",
              "price": 140
          },
          {
              "id": 5,
              "title": "Order a meal from the restaurant",
              "price": 30
          }
      ]
  },
  {
      "id": "14",
      "type": "bus",
      "date_from": "2022-05-05T12:07:49.031Z",
      "date_to": "2022-05-06T01:52:50.412Z",
      "destination": {
          "name": "Den Haag",
          "description": "Den Haag, a true asian pearl, in a middle of Europe, with a beautiful old town.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.3558416466334209",
                  "description": "Den Haag kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.814372952443349",
                  "description": "Den Haag park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5038740825581816",
                  "description": "Den Haag zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4839452804917126",
                  "description": "Den Haag kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.31876934630908305",
                  "description": "Den Haag kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.02768854857608627",
                  "description": "Den Haag kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3973988122012575",
                  "description": "Den Haag biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.49407971366685155",
                  "description": "Den Haag central station"
              }
          ]
      },
      "base_price": 400,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "Infotainment system",
              "price": 50
          },
          {
              "id": 2,
              "title": "Order meal",
              "price": 100
          },
          {
              "id": 3,
              "title": "Choose seats",
              "price": 190
          }
      ]
  },
  {
      "id": "15",
      "type": "drive",
      "date_from": "2022-05-06T01:52:50.412Z",
      "date_to": "2022-05-07T00:44:16.295Z",
      "destination": {
          "name": "Valencia",
          "description": "Valencia, in a middle of Europe, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.7668383464912176",
                  "description": "Valencia biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6098267361717249",
                  "description": "Valencia central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.30445695594809563",
                  "description": "Valencia kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3570586477988278",
                  "description": "Valencia parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5965784101972182",
                  "description": "Valencia city centre"
              }
          ]
      },
      "base_price": 600,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "With automatic transmission",
              "price": 110
          },
          {
              "id": 2,
              "title": "With air conditioning",
              "price": 180
          }
      ]
  },
  {
      "id": "16",
      "type": "restaurant",
      "date_from": "2022-05-07T00:44:16.295Z",
      "date_to": "2022-05-08T00:14:09.587Z",
      "destination": {
          "name": "Frankfurt",
          "description": "Frankfurt, with a beautiful old town.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.10962094214329432",
                  "description": "Frankfurt parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9183130390768746",
                  "description": "Frankfurt central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.09669860007392916",
                  "description": "Frankfurt city centre"
              }
          ]
      },
      "base_price": 1100,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "Choose live music",
              "price": 150
          },
          {
              "id": 2,
              "title": "Choose VIP area",
              "price": 70
          }
      ]
  },
  {
      "id": "17",
      "type": "restaurant",
      "date_from": "2022-05-08T00:14:09.587Z",
      "date_to": "2022-05-08T16:48:06.527Z",
      "destination": {
          "name": "Milan",
          "description": "Milan, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.19463992943736397",
                  "description": "Milan street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.08571363976748136",
                  "description": "Milan street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.16023304037033226",
                  "description": "Milan street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8397947931464493",
                  "description": "Milan city centre"
              }
          ]
      },
      "base_price": 700,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "Choose live music",
              "price": 150
          },
          {
              "id": 2,
              "title": "Choose VIP area",
              "price": 70
          }
      ]
  },
  {
      "id": "18",
      "type": "bus",
      "date_from": "2022-05-08T16:48:06.527Z",
      "date_to": "2022-05-09T05:21:53.354Z",
      "destination": {
          "name": "Amsterdam",
          "description": "Amsterdam, is a beautiful city, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.5744135436955593",
                  "description": "Amsterdam street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.22251732377489097",
                  "description": "Amsterdam kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3635736678075916",
                  "description": "Amsterdam embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.035893784151612707",
                  "description": "Amsterdam city centre"
              }
          ]
      },
      "base_price": 300,
      "is_favorite": false,
      "offers": [
          {
              "id": 1,
              "title": "Infotainment system",
              "price": 50
          },
          {
              "id": 2,
              "title": "Order meal",
              "price": 100
          },
          {
              "id": 3,
              "title": "Choose seats",
              "price": 190
          }
      ]
  },
  {
      "id": "19",
      "type": "drive",
      "date_from": "2022-05-09T05:21:53.354Z",
      "date_to": "2022-05-09T17:20:15.476Z",
      "destination": {
          "name": "Moscow",
          "description": "Moscow, is a beautiful city.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.8172368623179065",
                  "description": "Moscow biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.45501955775177727",
                  "description": "Moscow central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6176221634859675",
                  "description": "Moscow embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.29823402452346115",
                  "description": "Moscow city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.20185955724860238",
                  "description": "Moscow kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5541362657540816",
                  "description": "Moscow biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4920419384584718",
                  "description": "Moscow zoo"
              }
          ]
      },
      "base_price": 500,
      "is_favorite": true,
      "offers": [
          {
              "id": 1,
              "title": "With automatic transmission",
              "price": 110
          },
          {
              "id": 2,
              "title": "With air conditioning",
              "price": 180
          }
      ]
  }
]
`);

export {generatePoints};
