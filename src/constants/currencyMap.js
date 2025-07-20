import CopperPiece from '../assets/images/copper-piece.png'
import SilverPiece from '../assets/images/silver-piece.png'
import ElectrumPiece from '../assets/images/electrum-piece.png'
import GoldPiece from '../assets/images/gold-piece.png'
import PlatinumPiece from '../assets/images/platinum-piece.png'

// TODO: There is a similar setup in the CharacterDetailPage, but that is not quite compatible yet. Make it compatible.
const currencyMap = [
  {id: 'cp', label: 'CP', icon: CopperPiece, alt: 'Copper Piece'},
  {id: 'sp', label: 'SP', icon: SilverPiece, alt: 'Silver Piece'},
  {id: 'ep', label: 'EP', icon: ElectrumPiece, alt: 'Electrum Piece'},
  {id: 'gp', label: 'GP', icon: GoldPiece, alt: 'Gold Piece'},
  {id: 'pp', label: 'PP', icon: PlatinumPiece, alt: 'Platinum Piece'},
]

export default currencyMap