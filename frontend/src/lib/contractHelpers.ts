import { openContractCall } from '@stacks/connect';
import {
  stringAsciiCV,
  uintCV,
  PostConditionMode,
  AnchorMode,
} from '@stacks/transactions';
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const CONTRACT_NAME = 'bitvault-core';

const getNetwork = () => {
  return import.meta.env.VITE_NETWORK === 'mainnet' 
    ? STACKS_MAINNET 
    : STACKS_TESTNET;
};

export const createChallenge = async (
  _userSession: any,
  title: string,
  targetAmount: number,
  depositFrequency: number,
  durationBlocks: number,
  maxParticipants: number
) => {
  const network = getNetwork();
  
  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      anchorMode: AnchorMode.Any,
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
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        resolve(data);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

export const joinChallenge = async (
  _userSession: any,
  challengeId: number
) => {
  const network = getNetwork();
  
  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      anchorMode: AnchorMode.Any,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'join-challenge',
      functionArgs: [uintCV(challengeId)],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        resolve(data);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

export const makeDeposit = async (
  _userSession: any,
  challengeId: number,
  amount: number
) => {
  const network = getNetwork();
  
  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      anchorMode: AnchorMode.Any,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'make-deposit',
      functionArgs: [uintCV(challengeId), uintCV(amount)],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        resolve(data);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

export const completeChallenge = async (
  _userSession: any,
  challengeId: number
) => {
  const network = getNetwork();
  
  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      anchorMode: AnchorMode.Any,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'complete-challenge',
      functionArgs: [uintCV(challengeId)],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        resolve(data);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

export const claimRewards = async (
  _userSession: any,
  challengeId: number
) => {
  const network = getNetwork();
  
  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      anchorMode: AnchorMode.Any,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'claim-rewards',
      functionArgs: [uintCV(challengeId)],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        resolve(data);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};
