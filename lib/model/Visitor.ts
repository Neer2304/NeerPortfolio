import { Schema, models, model, Document } from "mongoose";

export interface IVisitor extends Document {
  visitedAt: Date; 
}

const visitorSchema = new Schema<IVisitor>({
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Visitor || model<IVisitor>("Visitor", visitorSchema);
