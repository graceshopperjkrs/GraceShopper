'use strict'

const db = require('../server/db')
const {User, Products, OrderStatuses} = require('../server/db/models')

async function seed() {
  try {
    await db.sync({force: true})
    /*------------------------------*/
    /*     users model              */
    /*------------------------------*/
    const users = await Promise.all([
      User.create({email: 'cody@email.com', password: '123'}),
      User.create({email: 'murphy@email.com', password: '123'})
    ])

    console.log(`seeded ${users.length} users`)
    console.log(`seeded users successfully`)
    /*------------------------------*/
    /*     products model           */
    /*------------------------------*/

    // await seed()
    // await Products.bulkCreate(productsData, {validate: true})
    await Promise.all(
      productsData.map(data => {
        return Products.create(data)
      })
    )
    console.log(`seeded ${productsData.length} products`)
    /*------------------------------*/
    /*     orderStatus model           */
    /*------------------------------*/
    await Promise.all([
      OrderStatuses.bulkCreate([
        {
          status: 'draft',
          description: 'items in cart, not purchased'
        },
        {
          status: 'purchased',
          description: 'items purchased, but not shipped'
        },
        {
          status: 'shipped',
          description: 'items shipped, but not deliverd'
        },
        {
          status: 'delivered',
          description: 'items delived'
        }
      ])
    ])

    console.log(`seeded orderStatus successfully`)
  } catch (err) {
    console.error(err)
    //  process.exitCode = 1
  } finally {
    console.log('closing db connection')
    console.log(`seeded successfully`)
  }
}
const productsData = [
  {
    name: 'JavaScript',
    imageUrl: 'https://i.ibb.co/4d8X1V8/Bean-JS.png',
    description: 'Brew up some JavaScript with this versatile magic bean.',
    price: 11
  },
  {
    name: 'Express',
    imageUrl: 'https://i.ibb.co/9GHTdfN/express.png',
    description: 'App.use this bean for your server framework needs.',
    price: 46
  },
  {
    name: 'Sequelize',
    imageUrl: 'https://i.ibb.co/tpCJt4p/Sequelize.png',
    description:
      'There is extra magic in this bean. Join statements not included.',
    price: 91
  },
  {
    name: 'Node',
    imageUrl: 'https://i.ibb.co/85Jgw2T/node.png',
    description:
      'A bean that allows you to NPM plant whatever your heart desires.',
    price: 46
  },
  {
    name: 'React',
    imageUrl: 'https://i.ibb.co/P9snRrk/react.png',
    description:
      'A front-end bean for creating a single-beanstalk application.',
    price: 88
  },
  {
    name: 'React-Redux',
    imageUrl: 'https://i.ibb.co/X5T7Zvs/reactredux.png',
    description: 'Two beans in a pod for predictable state management.',
    price: 100
  },
  {
    name: 'CSS FlexBean',
    imageUrl: 'https://i.ibb.co/YyhYV7P/css.png',
    description: 'For building beautiful bean gardens.',
    price: 42
  },
  {
    name: 'Git',
    imageUrl: 'https://i.ibb.co/59ZF7nj/git.png',
    description: 'Beanstalk version control. Keep your gardens weed-free!',
    price: 60
  },
  {
    name: 'TypeScript',
    imageUrl: 'https://i.ibb.co/n1HVywD/typescript.png',
    description: 'A friendly helping bean for optional static typing.',
    price: 43
  },
  {
    name: 'Chai',
    imageUrl: 'https://i.ibb.co/JzdnSsr/chai.png',
    description: 'A bean to test your garden at the roots.',
    price: 89
  }
  // {
  //   name: 'Duloxetine Hydrochloride',
  //   imageUrl: 'http://dummyimage.com/215x195.bmp/ff4444/ffffff',
  //   description:
  //     'Insertion of Infusion Device into Epididymis and Spermatic Cord, Via Natural or Artificial Opening',
  //   price: 19
  // },
  // {
  //   name: 'TRICLOSAN',
  //   imageUrl: 'http://dummyimage.com/151x172.png/ff4444/ffffff',
  //   description:
  //     'Dilation of Coronary Artery, One Artery, Bifurcation, with Radioactive Intraluminal Device, Percutaneous Approach',
  //   price: 92
  // },
  // {
  //   name: 'ZINC OXIDE, OCTISALATE, OCTINOXATE, TITANIUM DIOXIDE',
  //   imageUrl: 'http://dummyimage.com/188x108.bmp/5fa2dd/ffffff',
  //   description:
  //     'Therapeutic Exercise Treatment of Neurological System - Whole Body',
  //   price: 17
  // },
  // {
  //   name: 'furosemide',
  //   imageUrl: 'http://dummyimage.com/180x184.png/ff4444/ffffff',
  //   description:
  //     'Bypass Right Hypogastric Vein to Lower Vein with Autologous Venous Tissue, Open Approach',
  //   price: 87
  // },
  // {
  //   name: 'PYRITHIONE ZINC',
  //   imageUrl: 'http://dummyimage.com/134x216.bmp/5fa2dd/ffffff',
  //   description:
  //     'Bypass Thoracic Aorta, Descending to Subclavian with Autologous Arterial Tissue, Percutaneous Endoscopic Approach',
  //   price: 54
  // },
  // {
  //   name: 'ALCOHOL',
  //   imageUrl: 'http://dummyimage.com/159x173.png/dddddd/000000',
  //   description:
  //     'Drainage of Right Subclavian Vein with Drainage Device, Percutaneous Endoscopic Approach',
  //   price: 81
  // },
  // {
  //   name: 'TITANIUM DIOXIDE, OCTINOXATE',
  //   imageUrl: 'http://dummyimage.com/182x145.bmp/dddddd/000000',
  //   description:
  //     'Introduction of Radioactive Substance into Upper GI, Via Natural or Artificial Opening Endoscopic',
  //   price: 37
  // },
  // {
  //   name: 'TRICLOSAN',
  //   imageUrl: 'http://dummyimage.com/158x109.jpg/ff4444/ffffff',
  //   description: 'Destruction of Peroneal Nerve, Open Approach',
  //   price: 82
  // },
  // {
  //   name: 'LIDOCAINE HYDROCHLORIDE',
  //   imageUrl: 'http://dummyimage.com/182x223.bmp/5fa2dd/ffffff',
  //   description: 'Fragmentation in Urethra, External Approach',
  //   price: 8
  // },
  // {
  //   name: 'Doxylamine succinate',
  //   imageUrl: 'http://dummyimage.com/204x223.bmp/ff4444/ffffff',
  //   description:
  //     'Removal of Synthetic Substitute from Facial Bone, Percutaneous Approach',
  //   price: 19
  // }
]

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  try {
    console.log('Seeding magic beans...')

    await seed()

    await db.close()

    console.log('db connection closed')
  } catch {
    console.error('problem with seeding')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
