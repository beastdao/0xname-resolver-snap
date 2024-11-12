import type {
  OnNameLookupHandler,
  OnInstallHandler,
} from '@metamask/snaps-sdk';
import { Box, Heading, Text, Italic } from '@metamask/snaps-sdk/jsx';
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
    const tokenId = calculateTokenId(name as string, community as string);
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
          protocol: 'PoM Web3 User Name',
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
        <Box>
          <Heading>Installation successful 🎉</Heading>
          <Text>
            some text on snap installation : Thank you for installing web3 user
            names Snap. Your MetaMask is now supercharged with support web3 user
            names provided as a public good by PoM protocol. From now on, when
            sending on any EVM network, you can type any of web3 user name to
            resolve an address.
          </Text>
          <Text>
            When there are valid matches, you will be shown suggested addresses.{' '}
            <Italic>
              Please always take a moment to double-check names and suggested
              addresses.
            </Italic>
          </Text>
        </Box>
      ),
    },
  });
};
