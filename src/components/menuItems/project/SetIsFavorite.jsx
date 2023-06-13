import React from "react";
import { useFetcher, useFetchers, useRouteLoaderData } from "react-router-dom";
import { AddFavoriteIcon24, RemoveFavoriteIcon24 } from "@assets";
import { MenuItem } from "./components";

export default function SetIsFavorite({ id }) {
  const fetcher = useFetcher();
  const fetchers = useFetchers();
  const { projects } = useRouteLoaderData("root");

  const relevantFetcher = fetchers.find(
    (f) =>
      f.formData && f.formData.get("id") === id && f.formData.get("isFavorite")
  );

  const isFavorite = relevantFetcher
    ? relevantFetcher.formData.get("isFavorite") === "true"
    : projects.find((p) => p.id === id).isFavorite;

  return (
    <MenuItem
      as="button"
      onClick={() => {
        fetcher.submit(
          { type: "updateProject", id, isFavorite: !isFavorite },
          { method: "post" }
        );
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          {isFavorite ? <RemoveFavoriteIcon24 /> : <AddFavoriteIcon24 />}
        </span>
        <span className="text-sm/6">
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </span>
      </div>
    </MenuItem>
  );
}
