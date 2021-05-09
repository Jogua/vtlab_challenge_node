import Deliveries from '@/models/Deliveries.model';
import Products from '@/models/Products.model';
// import ProductsServices from '@/services/products/common.products.services.js';

const find = async (req) => {
  // some vars
  let query = {};
  let limit = req.body.limit ? (req.body.limit > 100 ? 100 : parseInt(req.body.limit)) : 100;
  let skip = req.body.page ? ((Math.max(0, parseInt(req.body.page)) - 1) * limit) : 0;
  let sort = { _id: 1 }

  // if date provided, filter by date
  if (req.body.when) {
    query['when'] = {
      '$gte': req.body.when
    }
  };

  let totalResults = await Deliveries.find(query).countDocuments();

  if (totalResults < 1) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find any delivery`
      }
    }
  }

  let deliveries = await Deliveries.find(query).skip(skip).sort(sort).limit(limit);

  return {
    totalResults: totalResults,
    deliveries
  }
}

const create = async (req) => {
  try {
    await Deliveries.create(req.body);
  } catch (e) {
    throw {
      code: 400,
      data: {
        message: `An error has occurred trying to create the delivery:
        ${JSON.stringify(e, null, 2)}`
      }
    }
  }
}

const findOne = async (req) => {
  let delivery = await Deliveries.findOne({_id: req.body.id});
  if (!delivery) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find a delivery with the sent ID`
      }
    }
  }
  return delivery;
}


const filter = async (req) => {
  // some vars
  let limit = req.body.limit ? (req.body.limit > 100 ? 100 : parseInt(req.body.limit)) : 100;
  let skip = req.body.page ? ((Math.max(0, parseInt(req.body.page)) - 1) * limit) : 0;
  let sort = { _id: 1 }

  // select only products with a weight greater or equal than the given weight and get IDs array
  let id_products = await Products.find({weight: {$gte: Number(req.body.weight)}}).distinct('_id');

  let query = {
    $and : [
      // filter deliveries between dateFrom and dateTo, both included
      {
        when : {
          '$gte': new Date(req.body.dateFrom),
          '$lte': new Date(req.body.dateTo),
        }
      },
      // filter deliveries with products with the given weight
      {
        products : {
          $in : id_products,
        }
      },
    ]
  };

  let totalResults = await Deliveries.find(query).countDocuments();

  if (totalResults < 1) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find any delivery`
      }
    }
  }

  // do populate to get products data
  let deliveries = await Deliveries.find(query).skip(skip).sort(sort).limit(limit).populate('products');
  
  return {
    totalResults: totalResults,
    deliveries,
  }
}


export default {
  find,
  create,
  findOne,
  filter
}
