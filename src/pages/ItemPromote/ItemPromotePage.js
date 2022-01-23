import { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import ItemNotFound from "../../components/ItemNotFound"
import HelmetBasics from "../../components/HelmetBasics"

import { route } from "../../utils"
import { NotFoundError } from "../../errors"
import { PROMOTING_TIERS } from "../../constants"
import { useFirebase, useAuthentication } from "../../hooks"

import { PageHeader, PromoteOptionsContainer } from "./ItemPromotePage.styles"
import { PromoteOptionCard } from "./PromoteOptionCard"

const ItemPromotePage = ({ match, history, location }) => {
  const firebase = useFirebase()
  const [itemError, setItemError] = useState(null)
  const authUser = useAuthentication()
  const [item, setItem] = useState(null)
  const itemId = match.params.id

  useEffect(() => {
    const getItem = async () => {
      try {
        // Get item from database
        let item = await firebase.getItemData(itemId)

        if (!item) throw new NotFoundError()

        if (item.userId !== authUser.uid) {
          history.replace(route("SIGN_IN"), {
            redirectTo: location,
            redirectReason: {
              message: "Nie masz wystarczających pozwoleń",
            },
          })
        }

        setItem(item)
      } catch (err) {
        if (err instanceof NotFoundError) {
          setItemError(err)
        } else {
          throw err
        }
      }
    }

    getItem()
  }, [firebase, itemId, authUser.uid, history, location])

  return (
    <PageContainer>
      {itemError ? (
        <ItemNotFound />
      ) : item ? (
        <div>
          <HelmetBasics fullTitle="Promuj ogłoszenie" />
          <PageHeader>
            <span role="img" aria-label="promowane">
              🔥 Promuj {item.name}
            </span>
          </PageHeader>

          <PromoteOptionsContainer>
            <PromoteOptionCard
              name={PROMOTING_TIERS[0]}
              level={0}
              price={4.99}
              itemId={itemId}
              items={[
                <div>
                  <b>7 dni</b> promowania na tablicy
                </div>,
              ]}
            />
            <PromoteOptionCard
              name={PROMOTING_TIERS[1]}
              level={1}
              price={9.99}
              itemId={itemId}
              main
              items={[
                <div>
                  <b>10 dni</b> promowania na tablicy
                </div>,
                <div>
                  <b>5</b> dodatkowych odświeżeń
                </div>,
              ]}
            />
            <PromoteOptionCard
              name={PROMOTING_TIERS[2]}
              level={2}
              price={25}
              itemId={itemId}
              items={[
                <div>
                  <b>14 dni</b> promowania na tablicy
                </div>,
                <div>
                  <b>10</b> dodatkowych odświeżeń
                </div>,
                <div>
                  <b>7 dni</b> promowania na stronie głównej
                </div>,
                <div>
                  <b>Promowanie na instagramie</b>
                </div>,
              ]}
            />
          </PromoteOptionsContainer>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </PageContainer>
  )
}

export default withRouter(ItemPromotePage)
