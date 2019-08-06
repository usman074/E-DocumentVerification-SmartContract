const express = require("express");
const bodyParser = require("body-parser");
const organizationRoutes = require("./routes/organizationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verifyDocRoutes = require("./routes/verifyDocRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/organization", organizationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/verifyDoc", verifyDocRoutes);

app.listen("8080", () => {
  console.log("listening...");
});
