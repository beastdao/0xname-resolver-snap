import type {
  OnNameLookupHandler,
  OnInstallHandler,
} from '@metamask/snaps-sdk';
import {
  Box,
  Heading,
  Italic,
  Text as SnapText,
} from '@metamask/snaps-sdk/jsx';
import { ethers, keccak256, solidityPacked } from 'ethers';

export const calculateTokenId = (
  nameValue: string,
  communityValue: string,
): string => {
  const encoded = solidityPacked(
    ['string', 'string'],
    [nameValue, communityValue],
  );
  const hash = keccak256(encoded);
  return ethers.toBigInt(hash).toString();
};

const ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256',
      },
    ],
    name: 'resolveAddressByTokenId',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
] as const;

export const onNameLookup: OnNameLookupHandler = async (request) => {
  const { domain } = request;
  if (domain) {
    const [name, community] = domain.split('@');
    const tokenId = calculateTokenId(name, community);
    const contractAddress = '0xaCeE2CB8Cf92D0d6DC7eB80bEF7dDecf75482819';

    const contractInterface = new ethers.Interface(ABI);
    const callData = contractInterface.encodeFunctionData(
      'resolveAddressByTokenId',
      [tokenId],
    );

    const response = (await ethereum.request({
      method: 'eth_call',
      params: [{ to: contractAddress, data: callData }, 'latest'],
    })) as string;
    let resolvedAddress;
    if (response) {
      resolvedAddress = `0x${response.slice(-40)}`;
    }

    return {
      resolvedAddresses: [
        {
          resolvedAddress: resolvedAddress as string,
          protocol: `0xNAME at ${community ?? ''}`,
          domainName: domain,
        },
      ],
    };
  }
  return null;
};

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: (
        <Box
          children={
            <div>
              <Heading children={'Installation successful 🎉'} />
              <SnapText
                children={
                  'Thank you for installing 0xNAME Resolver Snap. Your MetaMask is now supercharged with support 0xNAME provided as a public good by Beast DAO. From now on, when sending on any EVM network, you can type any of 0xNAME to resolve an address.'
                }
              />
              <SnapText
                children={
                  <div>
                    When there are valid matches, you will be shown suggested
                    addresses.
                    <Italic
                      children={
                        'Please always take a moment to double-check names and suggested addresses.'
                      }
                    />
                  </div>
                }
              />
            </div>
          }
        />
      ),
    },
  });
};
