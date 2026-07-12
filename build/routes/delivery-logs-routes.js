"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/delivery-logs-routes.ts
var delivery_logs_routes_exports = {};
__export(delivery_logs_routes_exports, {
  deliveryLogsRoutes: () => deliveryLogsRoutes
});
module.exports = __toCommonJS(delivery_logs_routes_exports);
var import_express = require("express");

// src/controllers/delivery-log-controller.ts
var import_zod = require("zod");

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
});

// src/controllers/delivery-log-controller.ts
var DeliveryLogsController = class {
  async create(request, response) {
    const bodySchema = import_zod.z.object({
      delivery_id: import_zod.z.string().uuid(),
      description: import_zod.z.string()
    });
    const { delivery_id, description } = bodySchema.parse(request.body);
    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id
      }
    });
    if (!delivery) {
      throw new AppError("delivery not found", 404);
    }
    if (delivery.status === "delivered") {
      throw new AppError("this order has already been delivered", 404);
    }
    if (delivery.status === "processing") {
      throw new AppError("Change status to shipped", 404);
    }
    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    });
    return response.status(201).json();
  }
  async show(request, response) {
    const paramsSchema = import_zod.z.object({
      delivery_id: import_zod.z.string().uuid()
    });
    const { delivery_id } = paramsSchema.parse(request.params);
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        user: true,
        logs: true
      }
    });
    if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
      throw new AppError("The user can only view their deliveries", 401);
    }
    return response.json(delivery);
  }
};

// src/middlewares/ensure-authenticated.ts
var import_jsonwebtoken = require("jsonwebtoken");

// src/env.ts
var import_zod2 = require("zod");
var envSchema = import_zod2.z.object({
  DATABASE_URL: import_zod2.z.string().url(),
  JWT_SECRET: import_zod2.z.string().min(1),
  PORT: import_zod2.z.string().transform((value) => parseInt(value, 10))
});
var env = envSchema.parse(process.env);

// src/configs/auth.ts
var authConfig = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: "1d"
  }
};

// src/middlewares/ensure-authenticated.ts
function ensureAuthenticated(request, response, next) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new AppError("JWT token is missing", 401);
    }
    const [, token] = authHeader.split(" ");
    const { sub: user_id, role } = (0, import_jsonwebtoken.verify)(
      token,
      authConfig.jwt.secret
    );
    request.user = {
      id: user_id,
      role
    };
    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}

// src/middlewares/verifyUserAtuhorization.ts
function verifyUserAuthorization(role) {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }
    if (!role.includes(req.user.role)) {
      throw new AppError("User not authorized", 403);
    }
    return next();
  };
}

// src/routes/delivery-logs-routes.ts
var deliveryLogsRoutes = (0, import_express.Router)();
var deliveryLogsController = new DeliveryLogsController();
deliveryLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
);
deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveryLogsController.show
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deliveryLogsRoutes
});
