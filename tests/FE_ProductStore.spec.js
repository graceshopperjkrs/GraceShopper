import {expect} from 'chai'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  AllProducts: [],
  SelectedProduct: {}
}
const store = mockStore(initialState)

import reducer, {
  gotAllProducts,
  GET_ALL_PRODUCTS,
  GET_SELECTED_PRODUCT,
  gotSelectedProducts
} from '../client/store/product'

const productList = [
  {
    id: 1,
    name: 'TITANIUM DIOXIDE, ZINC OXIDE',
    imageUrl: 'http://dummyimage.com/192x121.jpg/5fa2dd/ffffff',
    description:
      'Extraction of Face Subcutaneous Tissue and Fascia, Open Approach',
    price: 11
  },
  {
    id: 2,
    name: 'TITANIUM DIOXIDE, ZINC OXIDES',
    imageUrl: 'http://dummyimage.com/109x194.png/ff4444/ffffff',
    description:
      'Supplement Left Tympanic Membrane with Synthetic Substitute, Open Approach',
    price: 46
  },
  {
    id: 3,
    name: 'Simvastatin',
    imageUrl: 'http://dummyimage.com/140x218.bmp/ff4444/ffffff',
    description:
      'Occlusion of Splenic Vein with Extraluminal Device, Percutaneous Endoscopic Approach',
    price: 91
  }
]

const productsInitialState = {
  AllProducts: [],
  SelectedProduct: {}
}

describe('redux store for products', () => {
  describe('action creators', () => {
    let mock
    before(() => {
      mock = new MockAdapter(axios)
    })

    afterEach(() => {
      mock.reset()
    })

    after(() => {
      mock.restore()
    })

    describe('get products action', () => {
      it('create a GET_ALL_PRODUCTS action', () => {
        const getProductAction = gotAllProducts(productList)
        expect(getProductAction.type).to.equal(GET_ALL_PRODUCTS)
        expect(getProductAction.products).to.equal(productList)
      })
    })
  })

  describe('selected products reducer', () => {
    it('updates selected product', () => {
      const currentSelected = {
        id: 1,
        name: 'TITANIUM DIOXIDE, ZINC OXIDE',
        imageUrl: 'http://dummyimage.com/192x121.jpg/5fa2dd/ffffff',
        description:
          'Extraction of Face Subcutaneous Tissue and Fascia, Open Approach',
        price: 11
      }
      const newSelected = {
        id: 3,
        name: 'Simvastatin',
        imageUrl: 'http://dummyimage.com/140x218.bmp/ff4444/ffffff',
        description:
          'Occlusion of Splenic Vein with Extraluminal Device, Percutaneous Endoscopic Approach',
        price: 91
      }
      productsInitialState.SelectedProduct = currentSelected
      const newState = reducer(initialState, gotSelectedProducts(newSelected))
      expect(newState.SelectedProduct.id).to.equal(newSelected.id)
    })
  })
})
