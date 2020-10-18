/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenRootTypes {
  Answer: { // root type
    _id: string; // ID!
    content: string; // String!
    createdAt: string; // String!
    question: NexusGenRootTypes['Question']; // Question!
    user: NexusGenRootTypes['User']; // User!
  }
  Comment: { // root type
    _id: string; // ID!
    content: string; // String!
    createdAt: string; // String!
    question: NexusGenRootTypes['Question']; // Question!
    user: NexusGenRootTypes['User']; // User!
  }
  Message: { // root type
    _id: string; // ID!
    createdAt: string; // String!
    file?: string | null; // String
    image?: string | null; // String
    room: NexusGenRootTypes['Room']; // Room!
    text: string; // String!
    user: NexusGenRootTypes['User']; // User!
    video?: string | null; // String
  }
  Mutation: {};
  Query: {};
  Question: { // root type
    _id: string; // ID!
    answers: NexusGenRootTypes['Answer'][]; // [Answer!]!
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    createdAt: string; // String!
    description: string; // String!
    tags: string; // String!
    title: string; // String!
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Room: { // root type
    _id: string; // ID!
    createdAt: string; // String!
    description: string; // String!
    messages?: NexusGenRootTypes['Message'][] | null; // [Message!]
    title: string; // String!
    users?: NexusGenRootTypes['User'][] | null; // [User!]
  }
  Subscription: { // root type
    count?: number | null; // Int
    newRoomMessage: NexusGenRootTypes['Message']; // Message!
  }
  User: { // root type
    _id: string; // ID!
    answers?: NexusGenRootTypes['Answer'][] | null; // [Answer!]
    comments?: NexusGenRootTypes['Comment'][] | null; // [Comment!]
    createdAt: string; // String!
    email: string; // String!
    image: string; // String!
    messages?: NexusGenRootTypes['Message'][] | null; // [Message!]
    name: string; // String!
    password?: string | null; // String
    questions?: NexusGenRootTypes['Question'][] | null; // [Question!]
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
}

export interface NexusGenFieldTypes {
  Answer: { // field return type
    _id: string; // ID!
    content: string; // String!
    createdAt: string; // String!
    question: NexusGenRootTypes['Question']; // Question!
    user: NexusGenRootTypes['User']; // User!
  }
  Comment: { // field return type
    _id: string; // ID!
    content: string; // String!
    createdAt: string; // String!
    question: NexusGenRootTypes['Question']; // Question!
    user: NexusGenRootTypes['User']; // User!
  }
  Message: { // field return type
    _id: string; // ID!
    createdAt: string; // String!
    file: string | null; // String
    image: string | null; // String
    room: NexusGenRootTypes['Room']; // Room!
    text: string; // String!
    user: NexusGenRootTypes['User']; // User!
    video: string | null; // String
  }
  Mutation: { // field return type
    addAnswer: NexusGenRootTypes['Answer']; // Answer!
    addComment: NexusGenRootTypes['Comment']; // Comment!
    addQuestion: NexusGenRootTypes['Question']; // Question!
    addRoom: NexusGenRootTypes['Room']; // Room!
    deleteAnswer: NexusGenRootTypes['Answer'] | null; // Answer
    deleteComment: NexusGenRootTypes['Comment'] | null; // Comment
    deleteMessage: NexusGenRootTypes['Message']; // Message!
    deleteQuestion: NexusGenRootTypes['Question'] | null; // Question
    deleteRoom: NexusGenRootTypes['Room'] | null; // Room
    login: NexusGenRootTypes['User']; // User!
    logout: NexusGenRootTypes['User'] | null; // User
    newRoomMessage: NexusGenRootTypes['Message']; // Message!
    register: NexusGenRootTypes['User']; // User!
    updateAnswer: NexusGenRootTypes['Answer'] | null; // Answer
    updateComment: NexusGenRootTypes['Comment'] | null; // Comment
    updateQuestion: NexusGenRootTypes['Question'] | null; // Question
    updateRoom: NexusGenRootTypes['Room'] | null; // Room
    uploadUserImage: NexusGenRootTypes['User'] | null; // User
  }
  Query: { // field return type
    answer: NexusGenRootTypes['Answer'] | null; // Answer
    comment: NexusGenRootTypes['Comment'] | null; // Comment
    getMe: NexusGenRootTypes['User']; // User!
    getMessagesInRoom: NexusGenRootTypes['Message'][]; // [Message!]!
    question: NexusGenRootTypes['Question'] | null; // Question
    questionAnswers: NexusGenRootTypes['Answer'][]; // [Answer!]!
    questionComments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    questions: NexusGenRootTypes['Question'][]; // [Question!]!
    room: NexusGenRootTypes['Room'] | null; // Room
    rooms: NexusGenRootTypes['Room'][]; // [Room!]!
    user: NexusGenRootTypes['User']; // User!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Question: { // field return type
    _id: string; // ID!
    answers: NexusGenRootTypes['Answer'][]; // [Answer!]!
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    createdAt: string; // String!
    description: string; // String!
    tags: string; // String!
    title: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
  }
  Room: { // field return type
    _id: string; // ID!
    createdAt: string; // String!
    description: string; // String!
    messages: NexusGenRootTypes['Message'][] | null; // [Message!]
    title: string; // String!
    users: NexusGenRootTypes['User'][] | null; // [User!]
  }
  Subscription: { // field return type
    count: number | null; // Int
    newRoomMessage: NexusGenRootTypes['Message']; // Message!
  }
  User: { // field return type
    _id: string; // ID!
    answers: NexusGenRootTypes['Answer'][] | null; // [Answer!]
    comments: NexusGenRootTypes['Comment'][] | null; // [Comment!]
    createdAt: string; // String!
    email: string; // String!
    image: string; // String!
    messages: NexusGenRootTypes['Message'][] | null; // [Message!]
    name: string; // String!
    password: string | null; // String
    questions: NexusGenRootTypes['Question'][] | null; // [Question!]
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addAnswer: { // args
      content?: string | null; // String
      question?: string | null; // ID
    }
    addComment: { // args
      content?: string | null; // String
      question?: string | null; // ID
    }
    addQuestion: { // args
      description?: string | null; // String
      tags?: string | null; // String
      title?: string | null; // String
    }
    addRoom: { // args
      description?: string | null; // String
      title?: string | null; // String
    }
    deleteAnswer: { // args
      id?: string | null; // ID
    }
    deleteComment: { // args
      id?: string | null; // ID
    }
    deleteMessage: { // args
      id?: string | null; // ID
    }
    deleteQuestion: { // args
      id?: string | null; // ID
    }
    deleteRoom: { // args
      id?: string | null; // ID
    }
    login: { // args
      email?: string | null; // String
      password?: string | null; // String
    }
    newRoomMessage: { // args
      room?: string | null; // ID
      text?: string | null; // String
      url?: string | null; // String
    }
    register: { // args
      email?: string | null; // String
      image?: string | null; // String
      name?: string | null; // String
      password?: string | null; // String
    }
    updateAnswer: { // args
      content?: string | null; // String
      id?: string | null; // ID
    }
    updateComment: { // args
      content?: string | null; // String
      id?: string | null; // ID
    }
    updateQuestion: { // args
      description?: string | null; // String
      id?: string | null; // ID
      tags?: string | null; // String
      title?: string | null; // String
    }
    updateRoom: { // args
      description?: string | null; // String
      id?: string | null; // ID
      title?: string | null; // String
    }
    uploadUserImage: { // args
      url?: string | null; // String
    }
  }
  Query: {
    answer: { // args
      id?: string | null; // ID
    }
    comment: { // args
      id?: string | null; // ID
    }
    getMessagesInRoom: { // args
      room?: string | null; // ID
    }
    question: { // args
      id?: string | null; // ID
    }
    questionAnswers: { // args
      question?: string | null; // ID
    }
    questionComments: { // args
      question?: string | null; // ID
    }
    room: { // args
      id?: string | null; // ID
    }
    user: { // args
      id?: string | null; // ID
    }
  }
  Subscription: {
    newRoomMessage: { // args
      room?: string | null; // ID
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Answer" | "Comment" | "Message" | "Mutation" | "Query" | "Question" | "Room" | "Subscription" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}