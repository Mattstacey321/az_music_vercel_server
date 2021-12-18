import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoosePaginate from "mongoose-paginate-v2";
const opts = { toJSON: { virtuals: true } };

const SoundTrackSchema = new mongoose.Schema(
  {
    uploadId: {
      type: String,
      require: true,
    },
    title: String,
    cover: {
      type: {
        uploadId: String,
        url: String,
        format: String,
      },
      require: true,
    },
    url: {
      require: true,
      type: String,
    },
    format: String,
    tag: [String],
    source: String,
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artists",
    },
    createdTime: {
      default: Date.now,
      type: Date,
    },
  },
  opts
);

SoundTrackSchema.plugin(mongoosePaginate);
SoundTrackSchema.plugin(aggregatePaginate);

const SoundTrack = mongoose.model("soundtracks", SoundTrackSchema);
export { SoundTrack };
