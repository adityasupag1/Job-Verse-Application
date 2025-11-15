const express = require("express");
const { getAllJobs, getAllUsers, getAllApp, updateApplication, deleteApplication, updateUser, deleteUser, getApplication, getUser, getJob, updateJob, deleteJob } = require('../controllers/AdminControllers');
const { isAuthenticated, authorizationRoles } = require('../middlewares/auth');
const { applicationIdValidator, validateHandler, userIdValidator, JobIdValidator } = require('../middlewares/validators');
const router = express.Router();

router.route("/allJobs").get(isAuthenticated, authorizationRoles("admin"), getAllJobs);
router.route("/allUsers").get(isAuthenticated, authorizationRoles("admin"), getAllUsers);
router.route("/allApp").get(isAuthenticated, authorizationRoles("admin"), getAllApp);

router.route("/getApplication/:id").get(isAuthenticated, authorizationRoles("admin"), applicationIdValidator(), validateHandler, getApplication);
router.route("/updateApplication/:id").put(isAuthenticated, authorizationRoles("admin"), applicationIdValidator(), validateHandler, updateApplication);
router.route("/deleteApplication/:id").delete(isAuthenticated, authorizationRoles("admin"), applicationIdValidator(), validateHandler, deleteApplication);

router.route("/getUser/:id").get(isAuthenticated, authorizationRoles("admin"), userIdValidator(), validateHandler, getUser);
router.route("/updateUser/:id").put(isAuthenticated, authorizationRoles("admin"), userIdValidator(), validateHandler, updateUser);
router.route("/deleteUser/:id").delete(isAuthenticated, authorizationRoles("admin"), userIdValidator(), validateHandler, deleteUser);

router.route("/getJob/:id").get(isAuthenticated, authorizationRoles("admin"), JobIdValidator(), validateHandler, getJob);
router.route("/updateJob/:id").put(isAuthenticated, authorizationRoles("admin"), JobIdValidator(), validateHandler, updateJob);
router.route("/deleteJob/:id").delete(isAuthenticated, authorizationRoles("admin"), JobIdValidator(), validateHandler, deleteJob);

module.exports = router;