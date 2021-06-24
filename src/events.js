const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

router.post("/upload",  uploadFiles);
router.post("/get",  get);
router.post("/create",  create);



  function get (req, res) {
    db.query(
      'SELECT id, name, date FROM event',
      (error, results) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
            results.forEach(element => {
                console.log(element.name);
              });

          res.status(200).json({status: 'ok', list: results});
        }
      }
    );
  }



  function create (req, res) {
    db.query(
      'INSERT INTO event (name, date) VALUES (?,?)',
      [req.body.name, req.body.date],
      (error) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  }




  
  function uploadFiles(req, res) {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
      sampleFile = req.files.sampleFile;
    uploadPath = './uploads/' + sampleFile.name;
  
    let target_file = req.files.sampleFile;
    var file_name = './uploads/' + new Date().getTime() +'_'+target_file.name;
  
    sampleFile.mv(file_name, function(err) {
      if (err)
        return res.status(500).send(err);
      res.send('File uploaded!');
    });
}



  
  return router;
}

module.exports = createRouter;