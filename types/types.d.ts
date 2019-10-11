export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = {
   __typename?: 'Comment',
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  uid?: Maybe<Scalars['ID']>,
  linkedId?: Maybe<Scalars['ID']>,
  text?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type Image = {
   __typename?: 'Image',
  id?: Maybe<Scalars['ID']>,
  uid?: Maybe<Scalars['ID']>,
  link?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addPitstop?: Maybe<Pitstop>,
  addPitstopImage?: Maybe<Pitstop>,
  addUser?: Maybe<Scalars['Boolean']>,
};


export type MutationAddPitstopArgs = {
  name: Scalars['String'],
  notes: Scalars['String'],
  longitude: Scalars['Float'],
  latitude: Scalars['Float'],
  connection: Scalars['Int']
};


export type MutationAddPitstopImageArgs = {
  id: Scalars['ID'],
  image: Scalars['Upload']
};


export type MutationAddUserArgs = {
  email: Scalars['String'],
  uid: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  username: Scalars['String']
};

export type Pitstop = {
   __typename?: 'Pitstop',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  notes?: Maybe<Scalars['String']>,
  longitude?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>,
  connection?: Maybe<Scalars['Int']>,
  comments?: Maybe<Array<Maybe<Comment>>>,
  images?: Maybe<Array<Maybe<Image>>>,
};

export type Query = {
   __typename?: 'Query',
  Pitstop?: Maybe<Pitstop>,
  Pitstops?: Maybe<Array<Maybe<Pitstop>>>,
  Comments?: Maybe<Array<Maybe<Comment>>>,
  Comment?: Maybe<Comment>,
};


export type QueryPitstopArgs = {
  id: Scalars['ID']
};


export type QueryCommentArgs = {
  id: Scalars['ID']
};


export type User = {
   __typename?: 'User',
  username?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
};

