const usersData = [
  { firstName: 'Samir', lastName: 'Thakral', email: 'samir@email.com', password: '1234', totalPoints: 560 },
  { firstName: 'Lamine', lastName: 'Sadoun', email: 'lamine@email.com', password: '1234', totalPoints: 500 },
  { firstName: 'Dustin', lastName: 'McDowell', email: 'dustin@email.com', password: '1234', totalPoints: 600 },
  { firstName: 'Andrew', lastName: 'Trahan', email: 'andrew@email.com', password: '1234', totalPoints: 540 }
]

const productsData = [
  {
    "name": "miscellaneous",
    "points": 1,
    "description": "tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris.",
    "recycleUse": "Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit."
  },
  {
    "name": "bottle",
    "points": 3,
    "description": "In condimentum. Donec at arcu. Vestibulum ante ipsum primis in",
    "recycleUse": "sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac"
  },
  {
    "name": "jug",
    "points": 1,
    "description": "odio a purus. Duis elementum, dui quis accumsan convallis, ante",
    "recycleUse": "scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus."
  },
  {
    "name": "can",
    "points": 3,
    "description": "urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac",
    "recycleUse": "semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus."
  },
  {
    "name": "box",
    "points": 1,
    "description": "nunc ac mattis ornare, lectus ante dictum mi, ac mattis",
    "recycleUse": "consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque"
  },
  {
    "name": "sheet",
    "points": 2,
    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet,",
    "recycleUse": "mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras"
  },
  {
    "name": "notebook",
    "points": 2,
    "description": "semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In",
    "recycleUse": "sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu. Curabitur ut odio vel est tempor bibendum."
  },
  {
    "name": "bag",
    "points": 0,
    "description": "pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper,",
    "recycleUse": "dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus"
  },
  {
    "name": "trash",
    "points": 0,
    "description": "non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu.",
    "recycleUse": "congue a, aliquet vel, vulputate eu, odio. Phasellus at augue id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend"
  },
  {
    "name": "cup",
    "points": 2,
    "description": "Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem,",
    "recycleUse": "mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi"
  },
  {
    "name": "jar",
    "points": 4,
    "description": "mus. Donec dignissim magna a tortor. Nunc commodo auctor velit.",
    "recycleUse": "iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget"
  },
  {
    "name": "food",
    "points": 1,
    "description": "ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem",
    "recycleUse": "feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer sem elit,"
  },
  {
    "name": "cloth",
    "points": 1,
    "description": "quis accumsan convallis, ante lectus convallis est, vitae sodales nisi",
    "recycleUse": "arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend"
  },
  {
    "name": "mug",
    "points": 1,
    "description": "vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue",
    "recycleUse": "facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis"
  },
  {
    "name": "package",
    "points": 1,
    "description": "vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue",
    "recycleUse": "facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis"
  }
]

const categoriesData = [
  {
    "name": "Other", "description": "fringilla, porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo.", "multiplier": 1
  },
  {
    "name": "Plastic", "description": "fringilla, porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo.", "multiplier": 3
  },
  {
    "name": "Glass", "description": "Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae,", "multiplier": 3
  },
  {
    "name": "Metal", "description": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus", "multiplier": 5
  },
  {
    "name": "Paper", "description": "sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris", "multiplier": 1
  },
  {
    "name": "Wood", "description": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras", "multiplier": 1
  },
  {
    "name": "Compost", "description": "In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat", "multiplier": 1
  },
  {
    "name": "Landfill", "description": "molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim.", "multiplier": 0
  },
]

const commentsData = [
  {
    "text": "euismod in, dolor. Fusce feugiat.",
    "likes": 1
  },
  {
    "text": "aliquam iaculis, lacus pede sagittis",
    "likes": 8
  },
  {
    "text": "Donec egestas. Duis ac arcu.",
    "likes": 4
  },
  {
    "text": "lacus. Cras interdum. Nunc sollicitudin",
    "likes": 2
  },
  {
    "text": "consequat purus. Maecenas libero est,",
    "likes": 1
  },
  {
    "text": "luctus. Curabitur egestas nunc sed",
    "likes": 2
  },
  {
    "text": "interdum ligula eu enim. Etiam",
    "likes": 1
  },
  {
    "text": "augue. Sed molestie. Sed id",
    "likes": 3
  },
  {
    "text": "torquent per conubia nostra, per",
    "likes": 7
  },
  {
    "text": "tincidunt, neque vitae semper egestas,",
    "likes": 7
  },
  {
    "text": "velit eu sem. Pellentesque ut",
    "likes": 6
  },
  {
    "text": "pede ac urna. Ut tincidunt",
    "likes": 3
  },
  {
    "text": "amet lorem semper auctor. Mauris",
    "likes": 8
  },
  {
    "text": "nibh. Aliquam ornare, libero at",
    "likes": 5
  }
]

const milestonesData = [
  {
    pointsNeeded: 500,
    description: 'Bronze',
    badgeIcon: 'https://5.imimg.com/data5/EI/RR/MY-42585217/bronze-medals-500x500.jpg'
  },
  {
    pointsNeeded: 2000,
    description: 'Silver',
    badgeIcon: 'https://cdn1.vectorstock.com/i/1000x1000/77/50/silver-medal-vector-987750.jpg'
  },
  {
    pointsNeeded: 5000,
    description: 'Gold',
    badgeIcon: 'https://4.imimg.com/data4/NC/FH/MY-11054919/gold-medals-500x500.jpg'
  }
]

const tagsData = [
  { name: 'plastic', categoryName: 'Plastic' },
  { name: 'glass', categoryName: 'Glass' },
  { name: 'metal', categoryName: 'Metal' },
  { name: 'paper', categoryName: 'Paper' },
  { name: 'wood', categoryName: 'Wood' },
  { name: 'compost', categoryName: 'Compost' },
  { name: 'landfill', categoryName: 'Landfill' },
  { name: 'bottle', productName: 'bottle' },
  { name: 'water', productName: 'bottle', categoryName: 'Plastic' },
  { name: 'jug', productName: 'jug', categoryName: 'Plastic' },
  { name: 'can', productName: 'can', categoryName: 'Metal' },
  { name: 'tin can', productName: 'can', categoryName: 'Metal' },
  { name: 'tin', productName: 'can', categoryName: 'Metal' },
  { name: 'mug', productName: 'mug' },
  { name: 'box', productName: 'box', categoryName: 'Paper' },
  { name: 'package', productName: 'package', categoryName: 'Paper' },
  { name: 'pizza box', productName: 'box', categoryName: 'Paper' },
  { name: 'paper', productName: 'sheet', categoryName: 'Paper' },
  { name: 'notebook', productName: 'notebook', categoryName: 'Paper' },
  { name: 'bag', productName: 'bag', categoryName: 'Plastic' },
  { name: 'wrapper', productName: 'trash', categoryName: 'Landfill' },
  { name: 'trash', productName: 'trash', categoryName: 'Landfill' },
  { name: 'cup', productName: 'cup' },
  { name: 'coffee', productName: 'cup' },
  { name: 'coffee cup', productName: 'cup', categoryName: 'Paper' },
  { name: 'jar', productName: 'jar', categoryName: 'Glass' },
  { name: 'pickle', productName: 'jar', categoryName: 'Glass' },
  { name: 'mason jar', productName: 'jar', categoryName: 'Glass' },
  { name: 'pickle jar', productName: 'jar', categoryName: 'Glass' },
  { name: 'food', productName: 'food', categoryName: 'Compost' },
  { name: 'fruit', productName: 'food', categoryName: 'Compost' },
  { name: 'vegetable', productName: 'food', categoryName: 'Compost' },
  { name: 'dessert', productName: 'food', categoryName: 'Compost' },
  { name: 'dinner', productName: 'food', categoryName: 'Compost' },
  { name: 'breakfast', productName: 'food', categoryName: 'Compost' },
  { name: 'lunch', productName: 'food', categoryName: 'Compost' },
  { name: 'meal', productName: 'food', categoryName: 'Compost' },
  { name: 'cloth', productName: 'cloth' },
]

const adsData = [
  { activityId: 2, email: 'adsEmail@email.com', address: '405 W Superior St', city: 'Chicago', state: 'IL', zipCode: 60654, description: 'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?' },
  { activityId: 4, email: 'adsEmail@email.com', address: '233 S Wacker Dr', city: 'Chicago', state: 'IL', zipCode: 60606, description: 'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?' },
  { activityId: 6, email: 'adsEmail@email.com', address: '4400 N Lake Shore Dr,', city: 'Chicago', state: 'IL', zipCode: 60640, description: 'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?' },
  { activityId: 8, email: 'adsEmail@email.com', address: '1110 West Wolfram Street', city: 'Chicago', state: 'IL', zipCode: 60657, description: 'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?' },
  { activityId: 10, email: 'adsEmail@email.com', address: '600 E Grand Ave,', city: 'Chicago', state: 'IL', zipCode: 60611, description: 'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?' },
  { activityId: 12, email: 'adsEmail@email.com', address: '201 E Randolph St', city: 'Chicago', state: 'IL', zipCode: 60602, description: 'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?' },


]

module.exports = {
  productsData,
  usersData,
  categoriesData,
  commentsData,
  milestonesData,
  tagsData,
  adsData
}
