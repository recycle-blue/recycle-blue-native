'use strict'

const db = require('../server/db')
const {
  Product,
  Category,
  Milestone,
  Comments,
  User,
  Activity,
  Tag
} = require('../server/db/models')
const {
  productsData,
  usersData,
  categoriesData,
  commentsData,
  milestonesData,
  tagsData
} = require('./seed-data')

const shuffle = () => 0.5 - Math.random()
const randomIndexGenerator = num => Math.floor(Math.random() * num + 1)
/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const userP = User.bulkCreate(usersData, {individualHooks: true}) // must hit salting hooks
  const categoryP = Category.bulkCreate(categoriesData)
  const productP = Product.bulkCreate(productsData)
  //const commentP = Comments.bulkCreate(commentsData)
  const milestoneP = Milestone.bulkCreate(milestonesData)

  await Promise.all([userP, categoryP])
  // Products and Milestones require users and categories to be created
  await Promise.all([productP, milestoneP])
  //await Promise.all([commentP]);

  // Associations cannot be set immediately after creation (https://github.com/sequelize/sequelize/issues/864)
  await db.sync()
  const products = await Product.findAll()
  const categories = await Category.findAll()
  const users = await User.findAll()
  const milestones = await Milestone.findAll()

  //const comments = await Comments.findAll();

  await Promise.all(
    products.map(product => {
      const randomId = randomIndexGenerator(categories.length)
      const randomCategory = categories.find(
        category => category.id === randomId
      )
      return product.setCategory(randomCategory)
    })
  )

  await Promise.all(
    users.map(user => {
      const randomProducts = products.sort(shuffle).slice(0, 5)
      const quantity = randomIndexGenerator(5)
      const imageUrl = 'https://i.ytimg.com/vi/1qT-rOXB6NI/maxresdefault.jpg'
      return Promise.all(
        randomProducts.map(product => {
          return Activity.create({
            productId: product.id,
            userId: user.id,
            quantity,
            imageUrl,
            points: quantity * product.points
          })
        })
      )
    })
  )

  function getRandomUsers(user) {
    return users.filter(checkUser => checkUser.id !== user.id)
  }

  await Promise.all(
    users.map(user => {
      return user.setMilestone(milestones[0])
    })
  )

  await Promise.all(
    users.map(user => {
      const randomUsers = getRandomUsers(user)
      return user.addFollowers(randomUsers)
    })
  )

  const activities = await Activity.findAll()

  await Promise.all(
    users.map(user => {
      let testComments = commentsData
      const randomComment = testComments.sort(shuffle).slice(0, 2)[0]
      const randomId = randomIndexGenerator(activities.length)
      const randomActivity = activities.find(
        activity => activity.id === randomId
      )
      return Comments.create({
        activityId: randomActivity.id,
        userId: user.id,
        text: randomComment.text
      })
    })
  )

  await Promise.all(
    tagsData.map(async tag => {
      let product = {dataValues: 0}
      let category = {dataValues: 0}
      if (tag.productName) {
        product = await Product.find({where: {name: tag.productName}})
      }
      if (tag.categoryName) {
        category = await Category.find({where: {name: tag.categoryName}})
      }
      return Tag.create({
        name: tag.name,
        productId: product.dataValues.id || null,
        categoryId: category.dataValues.id || null
      })
    })
  )

  console.log(`seeded successfully`)
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function,xw IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
