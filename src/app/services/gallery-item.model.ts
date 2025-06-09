import { required } from '@rxweb/reactive-form-validators';
import { KeysOf, Reveal } from './utils.type';

export class GalleryItem {
  @required({ message: 'Name is required' })
  public name: string = '';

  @required({ message: 'Description is required' })
  public description: string = '';

  @required({ message: 'Image is required' })
  public image!: File;
}

export type GalleryItemFields = Reveal<KeysOf<GalleryItem>>;
