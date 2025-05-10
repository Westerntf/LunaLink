declare module "react-beautiful-dnd" {
    import * as React from "react";
  
    export interface DropResult {
      draggableId: string;
      type: string;
      source: {
        index: number;
        droppableId: string;
      };
      destination?: {
        index: number;
        droppableId: string;
      };
      reason?: "DROP" | "CANCEL";
      mode?: "FLUID" | "SNAP";
      combine?: any;
    }
  
    export interface DraggableProvided {
      draggableProps: any;
      dragHandleProps: any;
      innerRef: (element?: HTMLElement | null) => void;
    }
  
    export interface DroppableProvided {
      droppableProps: any;
      innerRef: (element?: HTMLElement | null) => void;
      placeholder?: React.ReactNode;
    }
  
    export const DragDropContext: React.ComponentType<{
      onDragEnd: (result: DropResult) => void;
      children: React.ReactNode;
    }>;
  
    export const Droppable: React.ComponentType<{
      droppableId: string;
      children: (
        provided: DroppableProvided,
        snapshot: any
      ) => React.ReactNode;
    }>;
  
    export const Draggable: React.ComponentType<{
      draggableId: string;
      index: number;
      children: (
        provided: DraggableProvided,
        snapshot: any
      ) => React.ReactNode;
    }>;
  }
  