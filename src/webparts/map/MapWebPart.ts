import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MapWebPart.module.scss';
import * as strings from 'MapWebPartStrings';
import * as mapbox from 'mapbox-gl';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface IMapWebPartProps {
  description: string;
}

export default class MapWebPart extends BaseClientSideWebPart<IMapWebPartProps> {


  protected onInit(): Promise<void> {
    SPComponentLoader.loadCss('https://api.tiles.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css');
    return super.onInit();
    }

    
  public render(): void {
    this.domElement.innerHTML = `        
    <div id="map" style="width:400px;height:300px;">    
    </div>`;
    let mapboxgl = mapbox;
    mapboxgl.accessToken='pk.eyJ1IjoiZGF2aWRwaW5oZWlybzA2IiwiYSI6ImNqaXE2ZDVneTBjOTYzdmxuZDV3Zm5maHUifQ.0wshU32xNHmz753qGnszyA';
     
    let lat: number = -9.189368;
    let lng: number = 38.754473;
    let coord = [lat, lng];
     
    let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9', 
    center: coord, 
    zoom: 5 
    });
     
    let Colombo = new mapboxgl.Marker()
    .setLngLat(coord)
    .addTo(map);
    let Laranjeiras = new mapboxgl.Marker()
    .setLngLat([-9.167797, 38.760653])
    .addTo(map);
    let Carnaxide = new mapboxgl.Marker()
    .setLngLat([-9.217789, 38.725352])
    .addTo(map);
    let Dragao = new mapboxgl.Marker()
    .setLngLat([-8.624738, 41.156126])
    .addTo(map);
    let Braga = new mapboxgl.Marker()
    .setLngLat([-8.448857, 41.528032])
    .addTo(map);
    
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
