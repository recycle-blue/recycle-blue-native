
const usersData = [
  {
    firstName: 'Samir',
    lastName: 'Thakral',
    email: 'samir@email.com',
    password: '1234',
    totalPoints: 499,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Samir_Thakral_Photo_zpsag94hzhv.png'
  },
  {
    firstName: 'Lamine',
    lastName: 'Sadoun',
    email: 'lamine@email.com',
    password: '1234',
    totalPoints: 3214,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Lamine_Sadoun_zpszumlybyi.jpeg'
  },
  {
    firstName: 'Dustin',
    lastName: 'McDowell',
    email: 'dustin@email.com',
    password: '1234',
    totalPoints: 4253,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Dustin_McDowell_zpsz2hsy7ol.jpeg'
  },
  {
    firstName: 'Andrew',
    lastName: 'Trahan',
    email: 'andrew@email.com',
    password: '1234',
    totalPoints: 5001,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Andrew_Trahan_zps3widrebx.jpeg'
  },
  {
    firstName: 'Conor',
    lastName: 'Hawes',
    email: 'conor@email.com',
    password: '1234',
    totalPoints: 1241,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Conor_Hawes_zpshb9muvka.jpeg'
  },
  {
    firstName: 'Daniel',
    lastName: 'Gutt',
    email: 'daniel@email.com',
    password: '1234',
    totalPoints: 421,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Daniel_Gutt_zpsiy2kqvkj.jpeg'
  },
  {
    firstName: 'Homum',
    lastName: 'Ahsan',
    email: 'homum@email.com',
    password: '1234',
    totalPoints: 123,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Homum_Ahsan_zpsykqivwyq.jpeg'
  },
  {
    firstName: 'Emily',
    lastName: 'Drevets',
    email: 'emily@email.com',
    password: '1234',
    totalPoints: 2022,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Emily_Drevets_zpsswuwyglt.jpeg'
  },
  {
    firstName: 'Jami',
    lastName: 'Gibbs',
    email: 'jami@email.com',
    password: '1234',
    totalPoints: 1242,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Jami_Gibbs_zpsylc3jcwb.jpeg'
  },
  {
    firstName: 'Mary',
    lastName: 'Warrick',
    email: 'mary@email.com',
    password: '1234',
    totalPoints: 2412,
    imageUrl: 'http://i36.photobucket.com/albums/e19/samirthakral/Mary_Warrick_zpspbhkcymd.jpeg'
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
    name: 'paper',
    points: 2,
    description:
      'semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In',
    recycleUse:
      'This paper can be used as packing material the next time you need to ship something.'
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
    description: 'Potato',
    badgeIcon: 'https://i.imgur.com/G3Jq9xM.png'
  },
  {
    pointsNeeded: 500,
    description: 'Bronze',
    badgeIcon: `https://imgur.com/SFCbISh.png`
  },
  {
    pointsNeeded: 2000,
    description: 'Silver',
    badgeIcon: `https://imgur.com/ukLTCUH.png`
  },
  {
    pointsNeeded: 5000,
    description: 'Gold',
    badgeIcon: `https://i.imgur.com/MB2tV2d.png`
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
  { name: 'mug', productName: 'mug', categoryName: 'Other' },
  { name: 'box', productName: 'box', categoryName: 'Paper' },
  { name: 'package', productName: 'package', categoryName: 'Paper' },
  { name: 'pizza box', productName: 'box', categoryName: 'Paper' },
  { name: 'paper', productName: 'paper', categoryName: 'Paper' },
  { name: 'notebook', productName: 'notebook', categoryName: 'Paper' },
  { name: 'bag', productName: 'bag', categoryName: 'Plastic' },
  { name: 'wrapper', productName: 'trash', categoryName: 'Landfill' },
  { name: 'trash', productName: 'trash', categoryName: 'Landfill' },
  { name: 'cup', productName: 'cup', categoryName: 'Paper' },
  { name: 'coffee', productName: 'cup', categoryName: 'Paper' },
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
  { name: 'cloth', productName: 'cloth', categoryName: 'Other' },
  { name: 'clothing', productName: 'cloth', categoryName: 'Other' },
  { name: 'clothes', productName: 'cloth', categoryName: 'Other' },
  { name: 'bedding', productName: 'sheet', categoryName: 'Other' },
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

const images = {
  miscellaneous:
    'https://images.pexels.com/photos/1034887/pexels-photo-1034887.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  bottle:
    'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  jug:
    'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  can:
    'https://images.pexels.com/photos/404178/pexels-photo-404178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  box:
    'https://images.pexels.com/photos/260184/pexels-photo-260184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  sheet:
    'https://images.pexels.com/photos/212269/pexels-photo-212269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  notebook:
    'https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  bag:
    'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  trash:
    'https://images.pexels.com/photos/850216/pexels-photo-850216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  cup:
    'https://images.pexels.com/photos/758702/pexels-photo-758702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  jar:
    'https://images.pexels.com/photos/5914/blue-glass-big-design.jpg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  food:
    'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  cloth:
    'https://images.pexels.com/photos/459486/pexels-photo-459486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  mug:
    'https://images.pexels.com/photos/606542/pexels-photo-606542.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  package:
    'https://images.pexels.com/photos/712316/pexels-photo-712316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200',
  paper:
    'https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
}

const properSeedData = {
  bottle: { productName: 'bottle', categoryName: 'Glass' },
  water: { productName: 'bottle', categoryName: 'Plastic' },
  jug: { productName: 'jug', categoryName: 'Glass' },
  can: { productName: 'can', categoryName: 'Metal' },
  'tin can': { productName: 'can', categoryName: 'Metal' },
  tin: { productName: 'can', categoryName: 'Metal' },
  mug: { productName: 'mug', categoryName: 'Other' },
  box: { productName: 'box', categoryName: 'Paper' },
  package: { productName: 'package', categoryName: 'Paper' },
  'pizza box': { productName: 'box', categoryName: 'Paper' },
  paper: { productName: 'paper', categoryName: 'Paper' },
  notebook: { productName: 'notebook', categoryName: 'Paper' },
  bag: { productName: 'bag', categoryName: 'Plastic' },
  wrapper: { productName: 'trash', categoryName: 'Landfill' },
  trash: { productName: 'trash', categoryName: 'Landfill' },
  cup: { productName: 'cup', categoryName: 'Paper' },
  coffee: { productName: 'cup', categoryName: 'Paper' },
  'coffee cup': { productName: 'cup', categoryName: 'Paper' },
  jar: { productName: 'jar', categoryName: 'Glass' },
  pickle: { productName: 'jar', categoryName: 'Glass' },
  'mason jar': { productName: 'jar', categoryName: 'Glass' },
  'pickle jar': { productName: 'jar', categoryName: 'Glass' },
  food: { productName: 'food', categoryName: 'Compost' },
  fruit: { productName: 'food', categoryName: 'Compost' },
  vegetable: { productName: 'food', categoryName: 'Compost' },
  dessert: { productName: 'food', categoryName: 'Compost' },
  dinner: { productName: 'food', categoryName: 'Compost' },
  breakfast: { productName: 'food', categoryName: 'Compost' },
  lunch: { productName: 'food', categoryName: 'Compost' },
  meal: { productName: 'food', categoryName: 'Compost' },
  cloth: { productName: 'cloth', categoryName: 'Other' },
  clothing: { productName: 'cloth', categoryName: 'Other' },
  clothes: { productName: 'cloth', categoryName: 'Other' },
  sheet: { productName: 'sheet', categoryName: 'Other' },
  miscellaneous: { productName: 'miscellaneous', categoryName: 'Other' },
}

module.exports = {
  productsData,
  usersData,
  categoriesData,
  commentsData,
  milestonesData,
  tagsData,
  adsData,
  images,
  properSeedData
}
