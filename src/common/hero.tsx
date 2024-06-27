import {
  APP_DESCRIPTION,
  APP_REPOSITORY_URL,
  APP_TITLE,
} from '@/common/common-utils';
import { ExternalLinkIcon } from '@/common/icons';
import { routes } from '@/routing/routing-utils';
import { ButtonLink } from './button-link';
import { Divider } from './divider';
import Image from "next/image";

export function Hero() {
  return (
    <div className="border-b">
      <header className="w-full flex justify-center items-start gap-24 px-24 py-6 mt-[10vh] text-gray-800">
        <div className=" w-[45%] flex flex-col items-start justify-start px-12 pt-8">
          <h1 className={` font-bold text-6xl mb-5 dark:text-white`}>
            Explorez nos produits laitiers <span className="text-primary"> delicieux   </span>et frais
          </h1>
          <p className="dark:text-gray-300 text-gray-700 mb-5">
            Découvrez le délice pur du lait frais et biologique, ainsi qu'une variété de fromages savoureux et de crèmes légères. Issus de sources de qualité et livrés directement à votre porte,
            nos produits laitiers garantissent fraîcheur et authenticité à chaque dégustation
          </p>
          <ButtonLink variant="primary" href={routes.search()}>
             Parcourir la boutique
          </ButtonLink>
        </div>
        <div className="flex justify-center items-center ">
          <div className="bg-primary p-12 rounded-full ">
            <Image
                src="/images/diary/Designer.jpeg"
                alt="milk glass image"
                width={350}
                height={250}
                className="rounded-full "
            />
          </div>
        </div>
      </header>

    </div>
  );
}
