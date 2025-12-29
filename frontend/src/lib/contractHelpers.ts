import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  stringAsciiCV,
  uintCV,
  PostConditionMode,
} from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { UserSession } from '@stacks/connect';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const CONTRACT_NAME = 'bitvault-core';

const getNetwork = () => {
  return import.meta.env.VITE_NETWORK === 'mainnet' 
    ? new StacksMainnet() 
    : new StacksTestnet();
};

export const createChallenge = async (
  userSession: UserSession,
  title: string,
  targetAmount: number,
  depositFrequency: number,
  durationBlocks: number,
  maxParticipants: number
) => {
  const network = getNetwork();
  
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'create-challenge',
    functionArgs: [
      stringAsciiCV(title),
      uintCV(targetAmount),
      uintCV(depositFrequency),
      uintCV(durationBlocks),
      uintCV(maxParticipants),
    ],
    senderKey: userSession.loadUserData().appPrivateKey,
    validateWithAbi: true,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  const transaction = await makeContractCall(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);
  
  return broadcastResponse;
};

export const joinChallenge = async (
  userSession: UserSession,
  challengeId: number
) => {
  const network = getNetwork();
  
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'join-challenge',
    functionArgs: [uintCV(challengeId)],
    senderKey: userSession.loadUserData().appPrivateKey,
    validateWithAbi: true,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  const transaction = await makeContractCall(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);
  
  return broadcastResponse;
};

export const makeDeposit = async (
  userSession: UserSession,
  challengeId: number,
  amount: number
) => {
  const network = getNetwork();
  
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'make-deposit',
    functionArgs: [uintCV(challengeId), uintCV(amount)],
    senderKey: userSession.loadUserData().appPrivateKey,
    validateWithAbi: true,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  const transaction = await makeContractCall(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);
  
  return broadcastResponse;
};

export const completeChallenge = async (
  userSession: UserSession,
  challengeId: number
) => {
  const network = getNetwork();
  
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'complete-challenge',
    functionArgs: [uintCV(challengeId)],
    senderKey: userSession.loadUserData().appPrivateKey,
    validateWithAbi: true,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  const transaction = await makeContractCall(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);
  
  return broadcastResponse;
};

export const claimRewards = async (
  userSession: UserSession,
  challengeId: number
) => {
  const network = getNetwork();
  
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'claim-rewards',
    functionArgs: [uintCV(challengeId)],
    senderKey: userSession.loadUserData().appPrivateKey,
    validateWithAbi: true,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  const transaction = await makeContractCall(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);
  
  return broadcastResponse;
};
