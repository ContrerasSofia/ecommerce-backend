const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tag_id' }]   
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id,{
      include: [{ model: Product, through: ProductTag, as: 'tag_id' }]   
    });
    if (!data) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//ADD a new tag
router.post('/', async (req, res) => {
  try {
    const data = await Tag.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE tags name
router.put('/:id', async (req, res) => {
  try{
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: 'Tag updated!' });
  }catch(err) {
      res.status(500).json(err);
    };
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!data) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
