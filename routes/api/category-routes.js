const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [{ model: Product }]   
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id,{
      include: [{ model: Product }]   
    });
    

    if (!data) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: 'Category updated!' });
  }catch(err) {
      res.status(500).json(err);
    };
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!data) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Category deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
