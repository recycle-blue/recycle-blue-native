const usersData = [
  {
    firstName: 'Samir',
    lastName: 'Thakral',
    email: 'samir@email.com',
    password: '1234',
    totalPoints: 560
  },
  {
    firstName: 'Lamine',
    lastName: 'Sadoun',
    email: 'lamine@email.com',
    password: '1234',
    totalPoints: 500
  },
  {
    firstName: 'Dustin',
    lastName: 'McDowell',
    email: 'dustin@email.com',
    password: '1234',
    totalPoints: 600
  },
  {
    firstName: 'Andrew',
    lastName: 'Trahan',
    email: 'andrew@email.com',
    password: '1234',
    totalPoints: 540
  }
]

const productsData = [
  {
    name: 'miscellaneous',
    points: 1,
    description:
      'tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris.',
    recycleUse:
      'There are various resources for DIY projects that can be completed with various used items around your house.'
  },
  {
    name: 'bottle',
    points: 3,
    description:
      'In condimentum. Donec at arcu. Vestibulum ante ipsum primis in',
    recycleUse: 'These are great for science projects or even planters!'
  },
  {
    name: 'jug',
    points: 1,
    description:
      'odio a purus. Duis elementum, dui quis accumsan convallis, ante',
    recycleUse:
      'Used milk jugs can be cleaned and used for water storage in case of emergencies.'
  },
  {
    name: 'can',
    points: 3,
    description: 'urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac',
    recycleUse:
      'These can provide great material for cookie cutters for the next time your family wants a delicious treat.'
  },
  {
    name: 'box',
    points: 1,
    description: 'nunc ac mattis ornare, lectus ante dictum mi, ac mattis',
    recycleUse: 'Boxes are some of the best toys your kids will ever have!'
  },
  {
    name: 'sheet',
    points: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet,',
    recycleUse: 'Sheets have a myriad of uses!'
  },
  {
    name: 'notebook',
    points: 2,
    description:
      'semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In',
    recycleUse:
      'The paper from this notebook can be used as packing material the next time you need to ship something.'
  },
  {
    name: 'bag',
    points: 0,
    description:
      'pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper,',
    recycleUse: 'Use this next time you go to the grocery store.'
  },
  {
    name: 'trash',
    points: 0,
    description:
      'non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu.',
    recycleUse: 'This is the opposite of recycling...'
  },
  {
    name: 'cup',
    points: 2,
    description:
      'Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem,',
    recycleUse:
      'Paper cups can be used a firestarter. Use this as an excuse to get out of the house!'
  },
  {
    name: 'jar',
    points: 4,
    description:
      'mus. Donec dignissim magna a tortor. Nunc commodo auctor velit.',
    recycleUse: 'Perfect for a piggie bank or a tip jar!'
  },
  {
    name: 'food',
    points: 1,
    description:
      'ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem',
    recycleUse: 'Put it in a tupperware container to eat later...or compost it!'
  },
  {
    name: 'cloth',
    points: 1,
    description:
      'quis accumsan convallis, ante lectus convallis est, vitae sodales nisi',
    recycleUse:
      'Clothing has the word cloth in it, so it is safe to say that cloth can be used to make clothing.'
  },
  {
    name: 'mug',
    points: 1,
    description:
      'vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue',
    recycleUse: 'Painting a mug with your own design can be a fun art project.'
  },
  {
    name: 'package',
    points: 1,
    description:
      'vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue',
    recycleUse: 'Great for all of your future shipping needs!'
  }
]

const categoriesData = [
  {
    name: 'Other',
    description:
      '79 million tons of waste material was diverted away from landfills in 2005 as a result of recycling and composting ',
    multiplier: 1
  },
  {
    name: 'Plastic',
    description: 'Plastic bottles can take 700 years to decompose',
    multiplier: 3
  },
  {
    name: 'Glass',
    description:
      'The energy saved from recycling 1 glass bottle will power a 60 watt bulb for 6 hours.',
    multiplier: 3
  },
  {
    name: 'Metal',
    description:
      'It takes the same amount of energy to make 1 new can as it does to make 20 recycled cans',
    multiplier: 5
  },
  {
    name: 'Paper',
    description: 'Every ton of paper recycled saves 60,000 gallons of water',
    multiplier: 1
  },
  {
    name: 'Wood',
    description:
      'Certain government agencies (e.g. WRAP) give grants to individual companies that demonstrate innovation in wood recycling.',
    multiplier: 1
  },
  {
    name: 'Compost',
    description: 'Compost is amazing. Good job!',
    multiplier: 1
  },
  {
    name: 'Landfill',
    description: 'Plastic bottles can take 700 years to decompose.',
    multiplier: 0
  }
]

const commentsData = [
  {
    text: 'euismod in, dolor. Fusce feugiat.',
    likes: 1
  },
  {
    text: 'aliquam iaculis, lacus pede sagittis',
    likes: 8
  },
  {
    text: 'Donec egestas. Duis ac arcu.',
    likes: 4
  },
  {
    text: 'lacus. Cras interdum. Nunc sollicitudin',
    likes: 2
  },
  {
    text: 'consequat purus. Maecenas libero est,',
    likes: 1
  },
  {
    text: 'luctus. Curabitur egestas nunc sed',
    likes: 2
  },
  {
    text: 'interdum ligula eu enim. Etiam',
    likes: 1
  },
  {
    text: 'augue. Sed molestie. Sed id',
    likes: 3
  },
  {
    text: 'torquent per conubia nostra, per',
    likes: 7
  },
  {
    text: 'tincidunt, neque vitae semper egestas,',
    likes: 7
  },
  {
    text: 'velit eu sem. Pellentesque ut',
    likes: 6
  },
  {
    text: 'pede ac urna. Ut tincidunt',
    likes: 3
  },
  {
    text: 'amet lorem semper auctor. Mauris',
    likes: 8
  },
  {
    text: 'nibh. Aliquam ornare, libero at',
    likes: 5
  }
]

const milestonesData = [
  {
    pointsNeeded: 0,
    description: 'potato',
    badgeIcon: 'https://i.imgur.com/G3Jq9xM.png'
  },
  {
    pointsNeeded: 500,
    description: 'Bronze',
    badgeIcon:
      'https://5.imimg.com/data5/EI/RR/MY-42585217/bronze-medals-500x500.jpg'
  },
  {
    pointsNeeded: 2000,
    description: 'Silver',
    badgeIcon:
      'https://cdn1.vectorstock.com/i/1000x1000/77/50/silver-medal-vector-987750.jpg'
  },
  {
    pointsNeeded: 5000,
    description: 'Gold',
    badgeIcon:
      'https://4.imimg.com/data4/NC/FH/MY-11054919/gold-medals-500x500.jpg'
  }
]

const tagsData = [
  {name: 'plastic', categoryName: 'Plastic'},
  {name: 'glass', categoryName: 'Glass'},
  {name: 'metal', categoryName: 'Metal'},
  {name: 'paper', categoryName: 'Paper'},
  {name: 'wood', categoryName: 'Wood'},
  {name: 'compost', categoryName: 'Compost'},
  {name: 'landfill', categoryName: 'Landfill'},
  {name: 'bottle', productName: 'bottle'},
  {name: 'water', productName: 'bottle', categoryName: 'Plastic'},
  {name: 'jug', productName: 'jug', categoryName: 'Plastic'},
  {name: 'can', productName: 'can', categoryName: 'Metal'},
  {name: 'tin can', productName: 'can', categoryName: 'Metal'},
  {name: 'tin', productName: 'can', categoryName: 'Metal'},
  {name: 'mug', productName: 'mug'},
  {name: 'box', productName: 'box', categoryName: 'Paper'},
  {name: 'package', productName: 'package', categoryName: 'Paper'},
  {name: 'pizza box', productName: 'box', categoryName: 'Paper'},
  {name: 'paper', productName: 'sheet', categoryName: 'Paper'},
  {name: 'notebook', productName: 'notebook', categoryName: 'Paper'},
  {name: 'bag', productName: 'bag', categoryName: 'Plastic'},
  {name: 'wrapper', productName: 'trash', categoryName: 'Landfill'},
  {name: 'trash', productName: 'trash', categoryName: 'Landfill'},
  {name: 'cup', productName: 'cup'},
  {name: 'coffee', productName: 'cup'},
  {name: 'coffee cup', productName: 'cup', categoryName: 'Paper'},
  {name: 'jar', productName: 'jar', categoryName: 'Glass'},
  {name: 'pickle', productName: 'jar', categoryName: 'Glass'},
  {name: 'mason jar', productName: 'jar', categoryName: 'Glass'},
  {name: 'pickle jar', productName: 'jar', categoryName: 'Glass'},
  {name: 'food', productName: 'food', categoryName: 'Compost'},
  {name: 'fruit', productName: 'food', categoryName: 'Compost'},
  {name: 'vegetable', productName: 'food', categoryName: 'Compost'},
  {name: 'dessert', productName: 'food', categoryName: 'Compost'},
  {name: 'dinner', productName: 'food', categoryName: 'Compost'},
  {name: 'breakfast', productName: 'food', categoryName: 'Compost'},
  {name: 'lunch', productName: 'food', categoryName: 'Compost'},
  {name: 'meal', productName: 'food', categoryName: 'Compost'},
  {name: 'cloth', productName: 'cloth'}
]

const adsData = [
  {
    email: 'adsEmail@email.com',
    address: '405 W Superior St',
    city: 'Chicago',
    state: 'IL',
    zipCode: 60654,
    description:
      'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?'
  },
  {
    email: 'adsEmail@email.com',
    address: '233 S Wacker Dr',
    city: 'Chicago',
    state: 'IL',
    zipCode: 60606,
    description:
      'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?'
  },
  {
    email: 'adsEmail@email.com',
    address: '4400 N Lake Shore Dr,',
    city: 'Chicago',
    state: 'IL',
    zipCode: 60640,
    description:
      'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?'
  },
  {
    email: 'adsEmail@email.com',
    address: '1110 West Wolfram Street',
    city: 'Chicago',
    state: 'IL',
    zipCode: 60657,
    description:
      'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?'
  },
  {
    email: 'adsEmail@email.com',
    address: '600 E Grand Ave,',
    city: 'Chicago',
    state: 'IL',
    zipCode: 60611,
    description:
      'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?'
  },
  {
    email: 'adsEmail@email.com',
    address: '201 E Randolph St',
    city: 'Chicago',
    state: 'IL',
    zipCode: 60602,
    description:
      'Come and pick up this wonderful, lovely, whatever this is. It is still in great condition! I promise?'
  }
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
