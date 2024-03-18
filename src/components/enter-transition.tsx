"use client";

import { Transition, type TransitionRootProps } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

type EnterTransitionProps = Pick<
  TransitionRootProps<typeof Fragment>,
  | "children"
  | "enter"
  | "enterFrom"
  | "enterTo"
  | "entered"
  | "beforeEnter"
  | "afterEnter"
>;

export default function EnterTransition(props: EnterTransitionProps) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setIsShowing(true);
  }, []);

  return <Transition show={isShowing} as={Fragment} {...props} />;
}
